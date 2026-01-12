import React from 'react';
import { SearchResultItem } from '@/lib/gemini';
import { ResultCard } from './ResultCard';

interface ResultSectionProps {
  title: string;
  items: SearchResultItem[];
  type: 'tool' | 'tutorial' | 'company' | 'news';
}

export const ResultSection = ({ title, items, type }: ResultSectionProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="py-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gemini-blue to-gemini-purple">
          {title}
        </h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <ResultCard key={index} item={item} type={type} />
        ))}
      </div>
    </div>
  );
};
