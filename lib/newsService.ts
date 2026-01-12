export type Category = 'App' | 'Company' | 'News';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: Category;
  summary: string;
  url: string;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI Releases GPT-5 Beta',
    date: '2023-10-25',
    category: 'Company',
    summary: 'The latest iteration of the GPT series promises enhanced reasoning capabilities and multimodal support.',
    url: '#'
  },
  {
    id: '2',
    title: 'New AI Health App "Vitality" Launches',
    date: '2023-10-24',
    category: 'App',
    summary: 'Vitality uses AI to predict health trends based on wearable data, offering personalized advice.',
    url: '#'
  },
  {
    id: '3',
    title: 'Global AI Regulations Summit',
    date: '2023-10-22',
    category: 'News',
    summary: 'World leaders gather to discuss the future of AI safety and regulatory frameworks.',
    url: '#'
  },
  {
    id: '4',
    title: 'DeepMind Solves Protein Folding (Again)',
    date: '2023-10-20',
    category: 'Company',
    summary: 'AlphaFold 3 achieves unprecedented accuracy in predicting protein structures.',
    url: '#'
  },
  {
    id: '5',
    title: 'AI Art Generator "PixelDream" Updates',
    date: '2023-10-18',
    category: 'App',
    summary: 'PixelDream adds video generation capabilities to its popular image creation tool.',
    url: '#'
  }
];

export const fetchNews = async (query: string): Promise<NewsItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (!query) return MOCK_NEWS;

  const lowerQuery = query.toLowerCase();
  return MOCK_NEWS.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) || 
    item.summary.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery)
  );
};
