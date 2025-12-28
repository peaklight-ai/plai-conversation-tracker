import { NextRequest, NextResponse } from 'next/server';
import { analyzeConversation, AnalysisResult } from '@/lib/comet';

export interface AnalyzeRequest {
  conversations: {
    id: string;
    contactName: string;
    contactCompany: string;
    messages: { sender: string; text: string }[];
  }[];
}

export interface AnalyzeResponse {
  results: {
    id: string;
    analysis: AnalysisResult;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();

    // Analyze all conversations in parallel
    const analysisPromises = body.conversations.map(async (conv) => {
      const analysis = await analyzeConversation(
        conv.contactName,
        conv.contactCompany,
        conv.messages
      );
      return {
        id: conv.id,
        analysis,
      };
    });

    const results = await Promise.all(analysisPromises);

    return NextResponse.json({ results } as AnalyzeResponse);
  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze conversations' },
      { status: 500 }
    );
  }
}
