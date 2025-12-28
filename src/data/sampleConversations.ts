export interface Message {
  sender: 'user' | 'contact';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  source: 'email' | 'linkedin' | 'whatsapp';
  contactName: string;
  contactCompany: string;
  lastDate: string;
  messages: Message[];
  isRelevant: boolean;
  statusSummary?: string;
  actionItems?: string[];
}

export const sampleConversations: Conversation[] = [
  {
    id: '1',
    source: 'email',
    contactName: 'Sarah Chen',
    contactCompany: 'TechFlow Inc',
    lastDate: '2025-12-27',
    isRelevant: true,
    messages: [
      { sender: 'user', text: 'Hi Sarah, following up on our demo last week. Did you have a chance to review the proposal with your team?', timestamp: '2025-12-20T10:30:00Z' },
      { sender: 'contact', text: 'Hi! Yes, the team loved the demo. We have a few questions about the enterprise pricing tier and implementation timeline.', timestamp: '2025-12-21T14:15:00Z' },
      { sender: 'user', text: 'Great to hear! I can schedule a call with our solutions architect to walk through both. Would Thursday work?', timestamp: '2025-12-21T15:00:00Z' },
      { sender: 'contact', text: 'Thursday works. Also, our CFO wants to know about volume discounts for 500+ seats.', timestamp: '2025-12-22T09:30:00Z' },
      { sender: 'user', text: 'Perfect! I\'ll prepare a custom quote for 500 seats with volume pricing. Sending calendar invite now.', timestamp: '2025-12-22T10:00:00Z' },
      { sender: 'contact', text: 'Thanks! Looking forward to it. We\'re aiming to make a decision before Q1 ends.', timestamp: '2025-12-27T11:00:00Z' },
    ],
  },
  {
    id: '2',
    source: 'linkedin',
    contactName: 'Marcus Williams',
    contactCompany: 'DataDrive Solutions',
    lastDate: '2025-12-26',
    isRelevant: true,
    messages: [
      { sender: 'user', text: 'Hi Marcus, I noticed DataDrive just raised Series B - congrats! I think our analytics platform could help with your scaling challenges.', timestamp: '2025-12-18T08:00:00Z' },
      { sender: 'contact', text: 'Thanks for reaching out! We are actually looking at analytics solutions. What makes yours different?', timestamp: '2025-12-19T16:45:00Z' },
      { sender: 'user', text: 'We specialize in real-time processing at scale - we handle 10M+ events/sec for companies like Stripe. Happy to do a quick intro call?', timestamp: '2025-12-19T17:30:00Z' },
      { sender: 'contact', text: 'That sounds relevant. Can you send some case studies first? I\'ll share with our VP of Engineering.', timestamp: '2025-12-26T10:00:00Z' },
    ],
  },
  {
    id: '3',
    source: 'whatsapp',
    contactName: 'Ahmed Hassan',
    contactCompany: 'Gulf Logistics',
    lastDate: '2025-12-28',
    isRelevant: true,
    messages: [
      { sender: 'contact', text: 'Hey, got your proposal. The team is reviewing but we need it in Arabic for the board meeting.', timestamp: '2025-12-24T13:00:00Z' },
      { sender: 'user', text: 'No problem Ahmed! I\'ll have the Arabic version ready by tomorrow. When is the board meeting?', timestamp: '2025-12-24T13:30:00Z' },
      { sender: 'contact', text: 'January 5th. Also can you include the ROI projections we discussed?', timestamp: '2025-12-24T14:00:00Z' },
      { sender: 'user', text: 'Absolutely. I\'ll add the 18-month ROI model showing the $2.3M savings projection.', timestamp: '2025-12-24T14:15:00Z' },
      { sender: 'contact', text: 'Perfect. If board approves, we can sign by mid-January inshallah', timestamp: '2025-12-28T09:00:00Z' },
    ],
  },
  {
    id: '4',
    source: 'email',
    contactName: 'Jennifer Martinez',
    contactCompany: 'HealthFirst Medical',
    lastDate: '2025-12-15',
    isRelevant: false,
    messages: [
      { sender: 'user', text: 'Hi Jennifer, I wanted to follow up on our conversation at the healthcare conference. Still interested in learning more about our HIPAA-compliant solution?', timestamp: '2025-12-10T09:00:00Z' },
      { sender: 'contact', text: 'Hi! Thanks for following up. We\'re actually in the middle of a system migration right now. Can we reconnect in Q2?', timestamp: '2025-12-12T11:30:00Z' },
      { sender: 'user', text: 'Of course! I\'ll set a reminder to reach out in April. Best of luck with the migration!', timestamp: '2025-12-12T14:00:00Z' },
      { sender: 'contact', text: 'Appreciate it. I\'ll keep your info on file.', timestamp: '2025-12-15T10:00:00Z' },
    ],
  },
  {
    id: '5',
    source: 'linkedin',
    contactName: 'David Park',
    contactCompany: 'FinanceFlow',
    lastDate: '2025-12-23',
    isRelevant: true,
    messages: [
      { sender: 'user', text: 'Hi David, saw your post about scaling your ML infrastructure. We helped similar fintech companies reduce inference costs by 60%.', timestamp: '2025-12-15T10:00:00Z' },
      { sender: 'contact', text: 'Interesting timing - we\'re evaluating options now. What\'s your pricing model?', timestamp: '2025-12-16T09:00:00Z' },
      { sender: 'user', text: 'Usage-based, starting at $0.001 per inference. For your volume, probably $15-20k/month. Want to see a demo?', timestamp: '2025-12-16T10:30:00Z' },
      { sender: 'contact', text: 'Yes, but I need to loop in our CTO. She\'s back from vacation on Jan 2nd.', timestamp: '2025-12-23T15:00:00Z' },
    ],
  },
  {
    id: '6',
    source: 'email',
    contactName: 'Lisa Thompson',
    contactCompany: 'RetailMax',
    lastDate: '2025-12-28',
    isRelevant: true,
    messages: [
      { sender: 'contact', text: 'Hi, I saw your platform at NRF. We\'re looking for an inventory management solution. Can you send pricing?', timestamp: '2025-12-20T08:00:00Z' },
      { sender: 'user', text: 'Hi Lisa! Great meeting you at NRF. Pricing attached. For 50 stores, you\'re looking at the Growth tier. Want to schedule a deeper dive?', timestamp: '2025-12-20T09:30:00Z' },
      { sender: 'contact', text: 'Thanks! Pricing looks reasonable. Can you do a pilot with 5 stores first?', timestamp: '2025-12-21T14:00:00Z' },
      { sender: 'user', text: 'Absolutely - we offer a 30-day pilot program. I\'ll send over the pilot agreement.', timestamp: '2025-12-21T15:00:00Z' },
      { sender: 'contact', text: 'Received. Legal is reviewing. Should have feedback by end of week.', timestamp: '2025-12-28T10:00:00Z' },
    ],
  },
  {
    id: '7',
    source: 'whatsapp',
    contactName: 'Raj Patel',
    contactCompany: 'Mumbai Textiles',
    lastDate: '2025-12-20',
    isRelevant: false,
    messages: [
      { sender: 'user', text: 'Hi Raj, following up on our call. Did you get a chance to discuss with your partner?', timestamp: '2025-12-15T07:30:00Z' },
      { sender: 'contact', text: 'Yes, but we decided to go with a local vendor for now. Easier for support.', timestamp: '2025-12-18T11:00:00Z' },
      { sender: 'user', text: 'I understand. If things change, we now have a Mumbai support office. Happy to reconnect anytime.', timestamp: '2025-12-18T12:00:00Z' },
      { sender: 'contact', text: 'Good to know. I will keep that in mind for future.', timestamp: '2025-12-20T09:00:00Z' },
    ],
  },
  {
    id: '8',
    source: 'email',
    contactName: 'Michael O\'Brien',
    contactCompany: 'Celtic Construction',
    lastDate: '2025-12-27',
    isRelevant: true,
    messages: [
      { sender: 'user', text: 'Hi Michael, thanks for taking my call yesterday. As discussed, our project management platform integrates with your existing Procore setup.', timestamp: '2025-12-22T16:00:00Z' },
      { sender: 'contact', text: 'Thanks for the info. I\'m bringing this to our ops meeting on Monday. Can you join to present?', timestamp: '2025-12-23T10:00:00Z' },
      { sender: 'user', text: 'I\'d be happy to! What time works? I\'ll prepare a 15-min overview focused on the Procore integration.', timestamp: '2025-12-23T11:00:00Z' },
      { sender: 'contact', text: 'Meeting is 10am EST. I\'ll send a Teams invite. Looking forward to it.', timestamp: '2025-12-27T14:00:00Z' },
    ],
  },
  {
    id: '9',
    source: 'linkedin',
    contactName: 'Emma Watson',
    contactCompany: 'GreenTech Energy',
    lastDate: '2025-12-26',
    isRelevant: true,
    messages: [
      { sender: 'user', text: 'Hi Emma, I see GreenTech is expanding into solar monitoring. Our IoT platform powers monitoring for 3 of the top 5 solar providers.', timestamp: '2025-12-19T09:00:00Z' },
      { sender: 'contact', text: 'Hi! Yes, we\'re scaling fast. Currently evaluating 3 vendors. What\'s your differentiator?', timestamp: '2025-12-20T08:30:00Z' },
      { sender: 'user', text: 'Edge computing - we process data locally, reducing latency by 80% and cloud costs by 50%. Happy to share a technical deep-dive.', timestamp: '2025-12-20T10:00:00Z' },
      { sender: 'contact', text: 'That\'s exactly what we need. Can you send a technical architecture doc? I\'ll share with our engineering team.', timestamp: '2025-12-26T11:00:00Z' },
    ],
  },
  {
    id: '10',
    source: 'email',
    contactName: 'Tom Bradley',
    contactCompany: 'SportsPro Media',
    lastDate: '2025-12-10',
    isRelevant: false,
    messages: [
      { sender: 'user', text: 'Hi Tom, reaching out about our streaming analytics platform. Saw you\'re looking to improve viewer engagement metrics.', timestamp: '2025-12-05T11:00:00Z' },
      { sender: 'contact', text: 'Thanks, but we just signed a 3-year contract with a competitor last month. Timing is off.', timestamp: '2025-12-08T09:00:00Z' },
      { sender: 'user', text: 'No worries! I\'ll make a note to check back in 2027. Best of luck with the new platform.', timestamp: '2025-12-10T10:00:00Z' },
    ],
  },
  {
    id: '11',
    source: 'whatsapp',
    contactName: 'Fatima Al-Rashid',
    contactCompany: 'Desert Developments',
    lastDate: '2025-12-28',
    isRelevant: true,
    messages: [
      { sender: 'contact', text: 'Salam, we reviewed your proposal internally. Board wants a reference call with one of your UAE clients.', timestamp: '2025-12-26T08:00:00Z' },
      { sender: 'user', text: 'Wa alaikum assalam Fatima! I can arrange a call with our client at Emaar - they\'ve been using us for 2 years.', timestamp: '2025-12-26T09:00:00Z' },
      { sender: 'contact', text: 'Perfect. Also, can you confirm the implementation timeline? We need to go live before Ramadan.', timestamp: '2025-12-27T10:00:00Z' },
      { sender: 'user', text: 'Ramadan starts ~Feb 28. With a Jan 15 kickoff, we can have you live by Feb 15 with buffer. I\'ll coordinate the Emaar call.', timestamp: '2025-12-28T07:00:00Z' },
    ],
  },
  {
    id: '12',
    source: 'linkedin',
    contactName: 'Chris Anderson',
    contactCompany: 'NordicBank',
    lastDate: '2025-12-24',
    isRelevant: true,
    messages: [
      { sender: 'user', text: 'Hi Chris, congrats on the digital transformation initiative at NordicBank. Our fraud detection AI might be relevant - we work with 3 Nordic banks already.', timestamp: '2025-12-18T10:00:00Z' },
      { sender: 'contact', text: 'Thanks! We\'re actually in RFP phase for fraud detection. Can you respond to our formal RFP?', timestamp: '2025-12-20T09:00:00Z' },
      { sender: 'user', text: 'Absolutely! Please send it over. What\'s the submission deadline?', timestamp: '2025-12-20T10:30:00Z' },
      { sender: 'contact', text: 'Deadline is January 15th. I\'ll send the RFP doc today. Good luck!', timestamp: '2025-12-24T08:00:00Z' },
    ],
  },
];
