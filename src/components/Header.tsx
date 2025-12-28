'use client';

import Image from 'next/image';

interface HeaderProps {
  filter: 'all' | 'relevant' | 'needs-action';
  onFilterChange: (filter: 'all' | 'relevant' | 'needs-action') => void;
}

export function Header({ filter, onFilterChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Image
            src="/plai-logo.svg"
            alt="PLAI Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <div>
            <h1 className="text-xl font-semibold text-[#1A1A1A]">
              Conversation Tracker
            </h1>
            <p className="text-sm text-gray-500">Your AI Supercharger</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="text-sm text-gray-600">
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as typeof filter)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#BB8CFC] focus:border-transparent"
          >
            <option value="all">All Conversations</option>
            <option value="relevant">Relevant Only</option>
            <option value="needs-action">Needs Action</option>
          </select>
        </div>
      </div>
    </header>
  );
}
