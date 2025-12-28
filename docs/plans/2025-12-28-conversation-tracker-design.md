# PLAI Conversation Tracker - Design Document

**Date:** 2025-12-28
**Status:** Approved
**Purpose:** Sales conversation tracking demo

## Overview

A web application that displays sales conversations from multiple sources (LinkedIn, Email, WhatsApp) with AI-powered analysis. Each conversation shows an auto-generated status summary and action items to help salespeople track deals and follow-ups.

## User Flow

1. User opens the app and sees a table of all conversations
2. Every row displays:
   - Source icon (LinkedIn/Email/WhatsApp)
   - Contact name
   - Last message date
   - AI-generated Status Summary
   - AI-generated Action Items
   - "Relevant" checkbox for filtering
3. User can filter to show only "relevant" conversations
4. User can click any row to see full conversation thread in a side panel

## Data Structure

### Conversation Record
```typescript
interface Conversation {
  id: string;
  source: 'email' | 'linkedin' | 'whatsapp';
  contactName: string;
  contactCompany?: string;
  lastDate: string;
  messages: Message[];
  isRelevant: boolean;
  statusSummary: string;    // AI-generated
  actionItems: string[];    // AI-generated
}

interface Message {
  sender: 'user' | 'contact';
  text: string;
  timestamp: string;
}
```

## AI Integration

- **Provider:** CometAPI (OpenAI-compatible)
- **Model:** gpt-5.2-chat-latest
- **Base URL:** https://api.cometapi.com/v1

### Prompt Strategy
For each conversation, send to AI with prompt:
> "Analyze this sales conversation. Return: (1) A one-sentence status summary of where the deal stands. (2) A list of action items or follow-ups needed."

Results are cached on first load to avoid repeated API calls.

## UI Design

### Branding
- **Name:** PLAI Conversation Tracker
- **Tagline:** Your AI Supercharger

### Colors (Light Mode)
- Background: White `#FAF8F8`
- Text: Neon Noir `#1A1A1A`
- Primary accent: Vapor Violet `#BB8CFC`
- Buttons/highlights: Cyber Lime `#C3FE4C` (on dark surfaces only)

### Typography
- Headings: Afacad Flux (extra thin)
- Body: Montserrat (medium)

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│  [◇ PLAI]  Conversation Tracker        [Filter: All ▼]     │
├─────────────────────────────────────────────────────────────┤
│ ☑ │ Source │ Contact      │ Date    │ Status       │ Actions│
├───┼────────┼──────────────┼─────────┼──────────────┼────────┤
│ ☐ │ ✉️      │ John @ Acme  │ Dec 26  │ Awaiting...  │ Follow…│
│ ☑ │ 💼     │ Sarah @ Tech │ Dec 27  │ Negotiating  │ Send...│
└─────────────────────────────────────────────────────────────┘
```

## Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with PLAI color palette
- **AI Client:** OpenAI SDK pointing to CometAPI
- **Deployment:** Vercel

## Project Structure

```
/plai-conversation-tracker
├── app/
│   ├── layout.tsx        # Root layout with PLAI branding
│   ├── page.tsx          # Main dashboard
│   └── api/
│       └── analyze/
│           └── route.ts  # CometAPI endpoint
├── components/
│   ├── ConversationTable.tsx
│   ├── ConversationRow.tsx
│   ├── SidePanel.tsx
│   └── Header.tsx
├── data/
│   └── sampleConversations.json
├── lib/
│   └── comet.ts          # CometAPI client setup
├── public/
│   └── plai-logo.svg
└── tailwind.config.js    # PLAI color palette
```

## Sample Data

10-12 fake sales conversations representing:
- Cold outreach (awaiting response)
- Active negotiations
- Ready to close
- Gone cold / needs follow-up

Mix of LinkedIn, Email, and WhatsApp sources.

## Deployment

1. Push to GitHub (peaklight-ai/plai-conversation-tracker)
2. Import to Vercel
3. Add `COMET_API_KEY` environment variable
4. Deploy

## Future Considerations (Post-Demo)

- Real data import (Gmail API, LinkedIn scraping, WhatsApp Business API)
- Database persistence
- User authentication
- Editable action items / manual notes
