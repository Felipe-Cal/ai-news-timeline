import React from 'react';
import { SearchInput } from './SearchInput';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  hasSearched: boolean;
}

export const Hero = ({ searchQuery, onSearchChange, onSearch, isLoading, hasSearched }: HeroProps) => {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 transition-all duration-700 ease-in-out ${hasSearched ? 'py-10' : 'py-32 min-h-[70vh]'}`}>
      
      {/* Background Gradients */}
      {!hasSearched && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-gemini-blue/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-gemini-purple/10 rounded-full blur-[80px]" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 text-center">
        <h1 className={`font-bold tracking-tighter transition-all duration-700 ${hasSearched ? 'text-3xl md:text-4xl' : 'text-5xl md:text-7xl'}`}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gemini-blue via-gemini-purple to-gemini-orange">
            Explore AI Resources
          </span>
        </h1>

        <p className={`text-gray-500 max-w-2xl transition-all duration-700 ${hasSearched ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto text-lg md:text-xl'}`}>
          Discover tools, tutorials, companies, and news for any topic powered by Gemini.
        </p>
        
        <div className="w-full flex justify-center mt-4">
          <SearchInput 
            value={searchQuery}
            onChange={onSearchChange}
            onSearch={onSearch}
            isLoading={isLoading}
          />
        </div>

        {!hasSearched && (
          <div className="flex gap-4 mt-8 flex-wrap justify-center text-sm text-gray-400">
            <span>Try:</span>
            <button onClick={() => onSearchChange("create slide deck")} className="hover:text-gemini-blue transition-colors">create slide deck</button>
            <span>•</span>
            <button onClick={() => onSearchChange("make a video")} className="hover:text-gemini-blue transition-colors">make a video</button>
            <span>•</span>
            <button onClick={() => onSearchChange("convert pdf to markdown")} className="hover:text-gemini-blue transition-colors">convert pdf to markdown</button>
          </div>
        )}
      </div>
    </section>
  );
};
