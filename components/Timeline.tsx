import React from 'react';
import { NewsItem } from '@/lib/newsService';
import { TimelineItem } from './TimelineItem';

interface TimelineProps {
  items: NewsItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-white/50">
        No news found. Try a different search.
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-12 py-10 px-4 max-w-5xl mx-auto">
      {items.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};
