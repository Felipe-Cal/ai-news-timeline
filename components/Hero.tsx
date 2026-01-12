import React from 'react';
import { SearchInput } from './SearchInput';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading: boolean;
}

export const Hero = ({ searchQuery, onSearchChange, isLoading }: HeroProps) => {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 px-4 text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">
          AI News Timeline
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl">
          Track the evolution of Artificial Intelligence. Stay updated with the latest breakthroughs, apps, and company news.
        </p>
        
        <div className="w-full flex justify-center mt-4">
          <SearchInput 
            value={searchQuery}
            onChange={onSearchChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};
