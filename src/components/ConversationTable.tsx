'use client';

import { Conversation } from '@/data/sampleConversations';
import { ConversationRow } from './ConversationRow';

interface ConversationTableProps {
  conversations: Conversation[];
  onToggleRelevant: (id: string) => void;
  onSelectConversation: (conversation: Conversation) => void;
  selectedId: string | null;
  isLoading: boolean;
}

export function ConversationTable({
  conversations,
  onToggleRelevant,
  onSelectConversation,
  selectedId,
  isLoading,
}: ConversationTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#BB8CFC] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Analyzing conversations with AI...</p>
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No conversations match your filter.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
              <span title="Mark as relevant">Rel.</span>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
              Source
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status Summary
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action Items
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {conversations.map((conversation) => (
            <ConversationRow
              key={conversation.id}
              conversation={conversation}
              onToggleRelevant={onToggleRelevant}
              onSelect={onSelectConversation}
              isSelected={selectedId === conversation.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
