import OpenAI from 'openai';

// CometAPI is OpenAI-compatible
export const comet = new OpenAI({
  apiKey: process.env.COMET_API_KEY,
  baseURL: 'https://api.cometapi.com/v1',
});

export interface AnalysisResult {
  statusSummary: string;
  actionItems: string[];
}

export async function analyzeConversation(
  contactName: string,
  company: string,
  messages: { sender: string; text: string }[]
): Promise<AnalysisResult> {
  const conversationText = messages
    .map((m) => `${m.sender === 'user' ? 'Sales Rep' : contactName}: ${m.text}`)
    .join('\n');

  const prompt = `You are a sales assistant analyzing a conversation between a sales rep and a prospect (${contactName} from ${company}).

Conversation:
${conversationText}

Analyze this sales conversation and provide:
1. A one-sentence status summary of where this deal currently stands (be specific about the stage: initial outreach, discovery, demo completed, negotiating, ready to close, gone cold, etc.)
2. A list of 1-3 specific action items or follow-ups needed from the sales rep

Respond in JSON format:
{
  "statusSummary": "one sentence summary",
  "actionItems": ["action 1", "action 2"]
}`;

  try {
    const response = await comet.chat.completions.create({
      model: 'gpt-5.2-chat-latest',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful sales assistant. Always respond with valid JSON only, no markdown formatting.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content || '{}';

    // Try to parse the JSON response
    try {
      const parsed = JSON.parse(content);
      return {
        statusSummary: parsed.statusSummary || 'Unable to analyze',
        actionItems: parsed.actionItems || [],
      };
    } catch {
      // If JSON parsing fails, try to extract from text
      return {
        statusSummary: 'Analysis pending',
        actionItems: ['Review conversation manually'],
      };
    }
  } catch (error) {
    console.error('Error analyzing conversation:', error);
    return {
      statusSummary: 'Error analyzing conversation',
      actionItems: ['Check API configuration'],
    };
  }
}
