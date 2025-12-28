'use client';

import { Conversation } from '@/data/sampleConversations';

interface SidePanelProps {
  conversation: Conversation | null;
  onClose: () => void;
}

const sourceLabels: Record<Conversation['source'], string> = {
  email: 'Email',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
};

export function SidePanel({ conversation, onClose }: SidePanelProps) {
  if (!conversation) return null;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[450px] bg-white shadow-xl border-l border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A]">
            {conversation.contactName}
          </h2>
          <p className="text-sm text-gray-500">
            {conversation.contactCompany} • {sourceLabels[conversation.source]}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Close panel"
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* AI Analysis */}
      <div className="px-6 py-4 bg-[#BB8CFC]/5 border-b border-gray-200">
        <h3 className="text-sm font-medium text-[#BB8CFC] mb-2">AI Analysis</h3>
        <p className="text-sm text-[#1A1A1A] mb-3">
          {conversation.statusSummary || 'Analyzing...'}
        </p>
        {conversation.actionItems && conversation.actionItems.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">
              Action Items
            </h4>
            <ul className="space-y-1">
              {conversation.actionItems.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-[#1A1A1A] flex items-start gap-2"
                >
                  <span className="text-[#BB8CFC]">\u2022</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
          Conversation
        </h3>
        <div className="space-y-4">
          {conversation.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-[#BB8CFC] text-white rounded-br-none'
                    : 'bg-gray-100 text-[#1A1A1A] rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user'
                      ? 'text-white/70'
                      : 'text-gray-400'
                  }`}
                >
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
