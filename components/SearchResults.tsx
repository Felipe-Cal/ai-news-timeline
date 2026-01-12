import React from 'react';
import { SearchResults as SearchResultsType } from '@/lib/gemini';
import { ResultSection } from './ResultSection';

interface SearchResultsProps {
  data: SearchResultsType;
}

export const SearchResults = ({ data }: SearchResultsProps) => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ResultSection title="AI Tools" items={data.tools} type="tool" />
      <ResultSection title="Tutorials & Guides" items={data.tutorials} type="tutorial" />
      <ResultSection title="Top Companies" items={data.companies} type="company" />
      <ResultSection title="Latest News" items={data.news} type="news" />
    </div>
  );
};
