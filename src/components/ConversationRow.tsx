'use client';

import { Conversation } from '@/data/sampleConversations';

interface ConversationRowProps {
  conversation: Conversation;
  onToggleRelevant: (id: string) => void;
  onSelect: (conversation: Conversation) => void;
  isSelected: boolean;
}

const sourceIcons: Record<Conversation['source'], string> = {
  email: '\u2709\ufe0f',
  linkedin: '\ud83d\udcbc',
  whatsapp: '\ud83d\udcac',
};

const sourceLabels: Record<Conversation['source'], string> = {
  email: 'Email',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
};

export function ConversationRow({
  conversation,
  onToggleRelevant,
  onSelect,
  isSelected,
}: ConversationRowProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <tr
      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-[#BB8CFC]/10' : ''
      }`}
      onClick={() => onSelect(conversation)}
    >
      {/* Relevant Checkbox */}
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={conversation.isRelevant}
          onChange={(e) => {
            e.stopPropagation();
            onToggleRelevant(conversation.id);
          }}
          className="w-4 h-4 rounded border-gray-300 text-[#BB8CFC] focus:ring-[#BB8CFC]"
        />
      </td>

      {/* Source */}
      <td className="px-4 py-3">
        <span
          className="text-xl"
          title={sourceLabels[conversation.source]}
          role="img"
          aria-label={sourceLabels[conversation.source]}
        >
          {sourceIcons[conversation.source]}
        </span>
      </td>

      {/* Contact */}
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-[#1A1A1A]">{conversation.contactName}</p>
          <p className="text-sm text-gray-500">{conversation.contactCompany}</p>
        </div>
      </td>

      {/* Date */}
      <td className="px-4 py-3 text-gray-600">
        {formatDate(conversation.lastDate)}
      </td>

      {/* Status Summary */}
      <td className="px-4 py-3">
        <p className="text-[#BB8CFC] text-sm line-clamp-2">
          {conversation.statusSummary || 'Analyzing...'}
        </p>
      </td>

      {/* Action Items */}
      <td className="px-4 py-3">
        {conversation.actionItems && conversation.actionItems.length > 0 ? (
          <ul className="text-sm text-[#1A1A1A]">
            {conversation.actionItems.slice(0, 2).map((item, index) => (
              <li key={index} className="truncate max-w-[200px]">
                • {item}
              </li>
            ))}
            {conversation.actionItems.length > 2 && (
              <li className="text-gray-400">
                +{conversation.actionItems.length - 2} more
              </li>
            )}
          </ul>
        ) : (
          <span className="text-gray-400 text-sm">Analyzing...</span>
        )}
      </td>
    </tr>
  );
}
