"use client";

import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { Timeline } from '@/components/Timeline';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { fetchNews, NewsItem } from '@/lib/newsService';
import { Bell } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadNews(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const loadNews = async (searchQuery: string) => {
    setLoading(true);
    try {
      const data = await fetchNews(searchQuery);
      setNews(data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
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
    <main className="min-h-screen bg-dark-bg text-white relative">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-pink to-neon-green z-50" />
      
      {/* Floating Subscribe Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button 
          variant="secondary" 
          size="lg" 
          className="rounded-full shadow-lg shadow-neon-pink/30 flex gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Bell size={18} /> Subscribe to Search
        </Button>
      </div>

      <Hero 
        searchQuery={query}
        onSearchChange={setQuery}
        isLoading={loading}
      />

      <div className="container mx-auto pb-20">
        <Timeline items={news} />
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Stay Updated"
      >
        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <p className="text-white/70">
              Get notified when new stories match your current search: <span className="text-neon-blue font-bold">&quot;{query || 'All News'}&quot;</span>
            </p>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white/80">Email Address</label>
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white placeholder-white/30 focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="secondary" className="w-full">
                Subscribe Now
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green">
              <Bell size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">Subscribed!</h3>
            <p className="text-white/70">You&apos;ll receive updates for this search directly to your inbox.</p>
          </div>
        )}
      </Modal>
    </main>
  );
}
