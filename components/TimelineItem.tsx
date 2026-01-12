import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NewsItem } from '@/lib/newsService';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  item: NewsItem;
  index: number;
}

export const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'App': return 'text-neon-pink border-neon-pink/50 bg-neon-pink/10';
      case 'Company': return 'text-neon-blue border-neon-blue/50 bg-neon-blue/10';
      case 'News': return 'text-neon-green border-neon-green/50 bg-neon-green/10';
      default: return 'text-white border-white/50 bg-white/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex gap-8 pl-8 md:pl-0"
    >
        {/* Timeline Line & Dot */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-ml-px">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-blue shadow-[0_0_10px_#00f3ff]" />
        </div>

        {/* Content - Alternating sides on desktop */}
        <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto'}`}>
            <Card className="flex flex-col gap-3 group">
                <div className={`flex items-center gap-2 text-xs font-medium mb-1 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className={`px-2 py-0.5 rounded-full border ${getCategoryColor(item.category)}`}>
                        {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-white/50">
                        <Calendar size={12} />
                        {item.date}
                    </span>
                </div>
                
                <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors">
                    {item.title}
                </h3>
                
                <p className="text-white/70 text-sm">
                    {item.summary}
                </p>
                
                <div className={`mt-2 flex ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all gap-1 text-neon-blue hover:text-neon-blue hover:bg-transparent">
                        Learn More <ArrowRight size={14} />
                    </Button>
                </div>
            </Card>
        </div>
    </motion.div>
  );
};
