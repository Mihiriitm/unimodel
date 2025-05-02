'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  keywords: string[];
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'GPT-5 Development Rumors',
    content: 'Industry insiders suggest OpenAI is making significant progress on GPT-5, with breakthrough capabilities in reasoning and multimodal understanding.',
    image: '/news1.jpg',
    date: '2024-03-20',
    keywords: ['GPT-5', 'OpenAI', 'AI Development']
  },
  {
    id: '2',
    title: 'New Image Generation Model',
    content: 'A revolutionary image generation model combines the speed of Stable Diffusion with the quality of DALL-E 3.',
    image: '/news2.jpg',
    date: '2024-03-19',
    keywords: ['Image Generation', 'AI Art', 'Machine Learning']
  }
];

export default function ExploreTab() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  return (
    <div className="fixed top-8 right-8 z-40">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-sm border border-purple-500/20 flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="absolute top-16 right-0 w-[400px] bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl backdrop-blur-sm border border-purple-500/20 p-4"
          >
            {/* Keyword Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddKeyword();
                    }
                  }}
                  placeholder="Add keyword alerts..."
                  className="w-full p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-purple-500/20 focus:border-purple-500/40 focus:ring-0"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddKeyword}
                  className="absolute right-2 top-2 p-1 rounded-lg bg-purple-500 text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {keywords.map((keyword) => (
                  <motion.span
                    key={keyword}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm flex items-center gap-2"
                  >
                    {keyword}
                    <button
                      onClick={() => setKeywords(keywords.filter(k => k !== keyword))}
                      className="hover:text-purple-700"
                    >
                      ×
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>

            {/* News Grid */}
            <div className="space-y-4">
              {mockNews.map((news) => (
                <motion.button
                  key={news.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedNews(news)}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-500/5 to-indigo-500/5 hover:from-purple-500/10 hover:to-indigo-500/10 border border-purple-500/10 hover:border-purple-500/20 transition-all text-left"
                >
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {news.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {news.date}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {news.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Selected News Modal */}
            <AnimatePresence>
              {selectedNews && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                  onClick={() => setSelectedNews(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full mx-4 relative"
                  >
                    <button
                      onClick={() => setSelectedNews(null)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <h2 className="text-xl font-bold mb-2">{selectedNews.title}</h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {selectedNews.date}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedNews.content}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedNews.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
