"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export const SearchInput = ({ value, onChange, onSearch, isLoading }: SearchInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative w-full max-w-2xl group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 text-gray-400 group-focus-within:text-gemini-blue transition-colors duration-300">
        <button onClick={onSearch} className="focus:outline-none" disabled={isLoading}>
          <Search className={`h-5 w-5 ${isLoading ? 'animate-pulse text-gemini-blue' : ''}`} />
        </button>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for any topic (e.g., 'create slide deck')"
        className="w-full rounded-full border border-gray-200 bg-white py-4 pl-14 pr-12 text-lg text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-300
                   focus:border-gemini-blue focus:outline-none focus:ring-2 focus:ring-gemini-blue/20 focus:shadow-xl
                   hover:border-gray-300 hover:shadow-md"
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-6 flex items-center">
            <div className="h-5 w-5 border-2 border-gemini-blue border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
