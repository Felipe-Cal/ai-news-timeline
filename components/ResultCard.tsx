import React from 'react';
import { ExternalLink, Calendar, Building2, Wrench, BookOpen, Newspaper } from 'lucide-react';
import { SearchResultItem } from '@/lib/gemini';

interface ResultCardProps {
  item: SearchResultItem;
  type: 'tool' | 'tutorial' | 'company' | 'news';
}

const getIcon = (type: string) => {
  switch (type) {
    case 'tool': return <Wrench size={16} />;
    case 'tutorial': return <BookOpen size={16} />;
    case 'company': return <Building2 size={16} />;
    case 'news': return <Newspaper size={16} />;
    default: return <ExternalLink size={16} />;
  }
};

export const ResultCard = ({ item, type }: ResultCardProps) => {
  return (
    <a
      href={item.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-5 rounded-xl border border-gray-100 bg-white hover:border-gemini-blue/30 hover:shadow-lg hover:shadow-gemini-blue/5 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gemini-purple/80">
          {item.source || 'Unknown Source'}
        </div>
        <div className="text-gray-400 group-hover:text-gemini-blue transition-colors">
          <ExternalLink size={14} />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 group-hover:text-gemini-blue mb-2 line-clamp-2">
        {item.title}
      </h3>

      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
        {item.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1">
          {getIcon(type)}
          <span className="capitalize">{type}</span>
        </div>
        {item.date && (
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{item.date}</span>
          </div>
        )}
      </div>
    </a>
  );
};
