'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { ConversationTable } from '@/components/ConversationTable';
import { SidePanel } from '@/components/SidePanel';
import { sampleConversations, Conversation } from '@/data/sampleConversations';

type FilterType = 'all' | 'relevant' | 'needs-action';

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Analyze conversations on mount
  useEffect(() => {
    async function analyzeConversations() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversations: sampleConversations.map((c) => ({
              id: c.id,
              contactName: c.contactName,
              contactCompany: c.contactCompany,
              messages: c.messages,
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setConversations((prev) =>
            prev.map((conv) => {
              const result = data.results.find((r: { id: string }) => r.id === conv.id);
              if (result) {
                return {
                  ...conv,
                  statusSummary: result.analysis.statusSummary,
                  actionItems: result.analysis.actionItems,
                };
              }
              return conv;
            })
          );
        }
      } catch (error) {
        console.error('Error analyzing conversations:', error);
      } finally {
        setIsLoading(false);
      }
    }

    analyzeConversations();
  }, []);

  const handleToggleRelevant = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, isRelevant: !conv.isRelevant } : conv
      )
    );
  }, []);

  const handleSelectConversation = useCallback((conversation: Conversation) => {
    setSelectedConversation(conversation);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedConversation(null);
  }, []);

  // Update selected conversation when conversations are analyzed
  useEffect(() => {
    if (selectedConversation) {
      const updated = conversations.find((c) => c.id === selectedConversation.id);
      if (updated) {
        setSelectedConversation(updated);
      }
    }
  }, [conversations, selectedConversation]);

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    switch (filter) {
      case 'relevant':
        return conv.isRelevant;
      case 'needs-action':
        return conv.actionItems && conv.actionItems.length > 0;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-[#FAF8F8]">
      <Header filter={filter} onFilterChange={setFilter} />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ConversationTable
            conversations={filteredConversations}
            onToggleRelevant={handleToggleRelevant}
            onSelectConversation={handleSelectConversation}
            selectedId={selectedConversation?.id || null}
            isLoading={isLoading}
          />
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Total Conversations</p>
            <p className="text-2xl font-semibold text-[#1A1A1A]">
              {conversations.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Marked Relevant</p>
            <p className="text-2xl font-semibold text-[#BB8CFC]">
              {conversations.filter((c) => c.isRelevant).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Need Action</p>
            <p className="text-2xl font-semibold text-[#1A1A1A]">
              {
                conversations.filter(
                  (c) => c.actionItems && c.actionItems.length > 0
                ).length
              }
            </p>
          </div>
        </div>
      </main>

      {/* Side Panel */}
      <SidePanel conversation={selectedConversation} onClose={handleClosePanel} />

      {/* Overlay when panel is open */}
      {selectedConversation && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={handleClosePanel}
        />
      )}
    </div>
  );
}
