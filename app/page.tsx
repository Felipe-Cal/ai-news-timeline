"use client";

import React, { useState } from 'react';
import { Hero } from '@/components/Hero';
import { SearchResults } from '@/components/SearchResults';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { searchGemini, SearchResults as SearchResultsType } from '@/lib/gemini';
import { Bell, AlertCircle } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const data = await searchGemini(searchQuery);
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setTimeout(() => {
      setSubscribed(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubscribed(false);
        setEmail('');
      }, 2000);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 relative">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-gemini-blue via-gemini-purple to-gemini-orange z-50" />
      
      {/* Floating Subscribe Button - only show if there's a query */}
      {hasSearched && (
        <div className="fixed bottom-8 right-8 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Button
            className="rounded-full shadow-lg shadow-gemini-blue/20 flex gap-2 bg-gemini-blue hover:bg-gemini-blue/90 text-white border-none"
            onClick={() => setIsModalOpen(true)}
          >
            <Bell size={18} /> Subscribe to &quot;{query}&quot;
          </Button>
        </div>
      )}

      <Hero 
        searchQuery={query}
        onSearchChange={setQuery}
        onSearch={() => performSearch(query)}
        isLoading={loading}
        hasSearched={hasSearched}
      />

      {results?.isMock && (
        <div className="container mx-auto px-4 mt-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3 text-amber-800">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">
              <span className="font-bold">Demo Mode:</span> A valid Gemini API Key was not found. Showing mock results.
            </p>
          </div>
        </div>
      )}

      {results && <SearchResults data={results} />}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Stay Updated"
      >
        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <p className="text-gray-600">
              Get notified when new AI tools, tutorials, or news appear for: <span className="text-gemini-blue font-bold">&quot;{query}&quot;</span>
            </p>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 placeholder-gray-400 focus:border-gemini-blue focus:outline-none focus:ring-1 focus:ring-gemini-blue"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" className="w-full bg-gemini-blue hover:bg-gemini-blue/90 text-white">
                Subscribe Now
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Bell size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Subscribed!</h3>
            <p className="text-gray-600">You&apos;ll receive updates for this topic directly to your inbox.</p>
          </div>
        )}
      </Modal>
    </main>
  );
}
