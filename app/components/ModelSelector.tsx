'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Model {
  id: string;
  name: string;
  provider: string;
  category: 'text' | 'image' | 'audio' | 'video' | 'multimodal';
  description: string;
  isPremium: boolean;
  isNew?: boolean;
}

export default function ModelSelector() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const models: Model[] = [
    {
      id: 'gpt-4',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      category: 'text',
      description: 'Most powerful large language model for complex tasks.',
      isPremium: true,
      isNew: true
    },
    {
      id: 'claude-3',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      category: 'text',
      description: 'Advanced reasoning and instruction following capabilities.',
      isPremium: true,
      isNew: true
    },
    {
      id: 'llama-3',
      name: 'Llama 3 70B',
      provider: 'Meta',
      category: 'text',
      description: 'Open-weight model with strong multilingual abilities.',
      isPremium: false
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      category: 'multimodal',
      description: 'Handles text, image, and code with superior quality.',
      isPremium: true
    },
    {
      id: 'mistral-large',
      name: 'Mistral Large',
      provider: 'Mistral AI',
      category: 'text',
      description: 'Excellent reasoning abilities and code generation.',
      isPremium: false
    },
    {
      id: 'sdxl',
      name: 'Stable Diffusion XL',
      provider: 'Stability AI',
      category: 'image',
      description: 'High-quality image generation with precise prompting.',
      isPremium: false
    },
    {
      id: 'midjourney-v6',
      name: 'Midjourney v6',
      provider: 'Midjourney',
      category: 'image',
      description: 'Hyperrealistic image generation with incredible detail.',
      isPremium: true
    },
    {
      id: 'dall-e-3',
      name: 'DALL-E 3',
      provider: 'OpenAI',
      category: 'image',
      description: 'Advanced text-to-image with high-fidelity output.',
      isPremium: true
    },
    {
      id: 'sora',
      name: 'Sora',
      provider: 'OpenAI',
      category: 'video',
      description: 'Generate high-quality videos from text prompts.',
      isPremium: true,
      isNew: true
    },
    {
      id: 'whisper-large-v3',
      name: 'Whisper Large v3',
      provider: 'OpenAI',
      category: 'audio',
      description: 'State-of-the-art speech recognition and transcription.',
      isPremium: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Models', icon: '🔍' },
    { id: 'text', label: 'Text', icon: '📝' },
    { id: 'image', label: 'Image', icon: '🖼️' },
    { id: 'audio', label: 'Audio', icon: '🔊' },
    { id: 'video', label: 'Video', icon: '🎬' },
    { id: 'multimodal', label: 'Multimodal', icon: '🔄' }
  ];

  const filteredModels = models.filter(model => {
    const matchesCategory = selectedCategory === null || selectedCategory === 'all' || model.category === selectedCategory;
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          model.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-xl shadow-purple-900/20">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-xl font-medium text-white">AI Model Explorer</h2>
          <p className="text-white/60 text-sm mt-1">Discover and select your preferred AI models</p>
        </div>
        
        {/* Search and Filter */}
        <div className="p-6 border-b border-white/10">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(prevCat => prevCat === category.id ? null : category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Models Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredModels.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="col-span-full p-8 text-center"
                >
                  <div className="mx-auto w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-lg font-medium">No models found</h3>
                  <p className="text-white/60 mt-2">Try adjusting your search or filters</p>
                </motion.div>
              ) : (
                filteredModels.map(model => (
                  <motion.div
                    key={model.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl opacity-30 blur-sm group-hover:opacity-100 group-hover:blur transition duration-300"></div>
                    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3 items-center">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            model.category === 'text' ? 'bg-gradient-to-br from-blue-500 to-indigo-700' :
                            model.category === 'image' ? 'bg-gradient-to-br from-pink-500 to-purple-700' :
                            model.category === 'audio' ? 'bg-gradient-to-br from-green-500 to-teal-700' :
                            model.category === 'video' ? 'bg-gradient-to-br from-red-500 to-rose-700' :
                            'bg-gradient-to-br from-amber-500 to-orange-700'
                          }`}>
                            {model.category === 'text' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            )}
                            {model.category === 'image' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                            )}
                            {model.category === 'audio' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                              </svg>
                            )}
                            {model.category === 'video' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                              </svg>
                            )}
                            {model.category === 'multimodal' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1zM13 12a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1h-3zm1 2v1h1v-1h-1zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zM7 9a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <h3 className="text-white font-medium">{model.name}</h3>
                        </div>
                        <div className="flex gap-2">
                          {model.isNew && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-600/70 text-white">NEW</span>
                          )}
                          {model.isPremium && (
                            <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mb-3">{model.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/50">{model.provider}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={model.isPremium 
                            ? "px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-500/50 text-amber-400 flex items-center gap-1"
                            : "px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition duration-200"
                          }
                        >
                          {model.isPremium && (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              <span>Unlock</span>
                            </>
                          )}
                          {!model.isPremium && "Select"}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
