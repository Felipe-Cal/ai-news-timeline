"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export const SearchInput = ({ value, onChange, isLoading }: SearchInputProps) => {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-neon-blue">
        <Search className={`h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search AI News..."
        className="w-full rounded-full border border-white/20 bg-white/5 py-4 pl-12 pr-4 text-white placeholder-white/40 backdrop-blur-md transition-all focus:border-neon-blue focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:shadow-neon-blue/20"
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-4 flex items-center">
            <div className="h-2 w-2 rounded-full bg-neon-blue animate-ping" />
        </div>
      )}
    </div>
  );
};
