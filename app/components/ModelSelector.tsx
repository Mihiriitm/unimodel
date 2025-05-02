'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Model {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isLocked: boolean;
}

const categories = [
  'General',
  'Image Generation',
  'Video Generation',
  'Speech Generation',
  'Deep Research',
  'Deep Coding',
  'Reasoning'
];

const mockModels: Model[] = [
  {
    id: '1',
    name: 'GPT-4 Turbo',
    description: 'Advanced language model',
    category: 'General',
    icon: '🤖',
    isLocked: false
  },
  {
    id: '2',
    name: 'DALL-E 3',
    description: 'Image generation',
    category: 'Image Generation',
    icon: '🎨',
    isLocked: true
  },
  {
    id: '3',
    name: 'Stable Video',
    description: 'Video generation',
    category: 'Video Generation',
    icon: '🎥',
    isLocked: true
  }
];

export default function ModelSelector() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('General');

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20 flex items-center justify-center"
      >
        <motion.svg 
          className="w-6 h-6 text-white"
          animate={{ rotate: isExpanded ? 45 : 0 }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 left-0 w-[300px] bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl backdrop-blur-sm border border-purple-500/20 p-4"
          >
            {/* Category Selector */}
            <div className="flex overflow-x-auto space-x-2 pb-4 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {mockModels
                .filter((model) => model.category === selectedCategory)
                .map((model) => (
                  <motion.button
                    key={model.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gradient-to-r from-purple-500/5 to-indigo-500/5 hover:from-purple-500/10 hover:to-indigo-500/10 border border-purple-500/10 hover:border-purple-500/20 transition-all relative overflow-hidden"
                  >
                    <div className="text-2xl mb-2">{model.icon}</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {model.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {model.description}
                    </div>
                    {model.isLocked && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                      >
                        <span className="text-white flex items-center gap-2">
                          <span>🔒</span> Pro
                        </span>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
