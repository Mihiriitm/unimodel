'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  url: string;
}

interface Alert {
  id: string;
  keyword: string;
  isActive: boolean;
}

export default function ExploreTab() {
  const [activeTab, setActiveTab] = useState<'trending' | 'research' | 'announcements'>('trending');
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', keyword: 'GPT-5', isActive: true },
    { id: '2', keyword: 'AI regulation', isActive: true },
    { id: '3', keyword: 'multimodal', isActive: false },
  ]);

  const newsItems: Record<string, NewsItem[]> = {
    trending: [
      {
        id: '1',
        title: 'OpenAI Releases Cutting-Edge GPT-4 Turbo Model',
        excerpt: 'The newest model features enhanced reasoning capabilities and twice the context length of previous versions.',
        date: '2 hours ago',
        category: 'Models',
        imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '#'
      },
      {
        id: '2',
        title: 'AI Researchers Make Breakthrough in Multimodal Learning',
        excerpt: 'New technique allows for seamless integration of text, image, and audio understanding in a single model.',
        date: '1 day ago',
        category: 'Research',
        imageUrl: 'https://images.unsplash.com/photo-1581092921461-7384ed02359b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '#'
      },
      {
        id: '3',
        title: 'EU AI Act Adopted: What You Need to Know',
        excerpt: 'The comprehensive legislation will regulate artificial intelligence based on risk categories.',
        date: '3 days ago',
        category: 'Regulation',
        imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '#'
      }
    ],
    research: [
      {
        id: '4',
        title: 'Training Language Models to Follow Instructions',
        excerpt: 'Anthropic researchers demonstrate improved results with constitutional AI approach.',
        date: '5 days ago',
        category: 'Paper',
        imageUrl: 'https://images.unsplash.com/photo-1495592822108-9e6261896da8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '#'
      },
      {
        id: '5',
        title: 'Advancements in Retrieval-Augmented Generation',
        excerpt: 'New techniques enhance LLM capabilities by efficiently retrieving and using external knowledge.',
        date: '1 week ago',
        category: 'Techniques',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '#'
      },
      {
        id: '6',
        title: 'Self-Supervised Learning Breakthroughs',
        excerpt: 'Researchers propose novel approach for learning without labeled data.',
        date: '2 weeks ago',
        category: 'Research',
        imageUrl: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '#'
      }
    ],
    announcements: [
      {
        id: '7',
        title: 'UniModel Platform Launch Event',
        excerpt: 'Join us for the official launch of our new AI platform with special guest speakers.',
        date: 'Next Wednesday',
        category: 'Event',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '#'
      },
      {
        id: '8',
        title: 'Premium Plan Early Access',
        excerpt: 'Sign up for early access to our premium features and get 3 months free.',
        date: 'Limited time',
        category: 'Offer',
        imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '#'
      },
      {
        id: '9',
        title: 'Upcoming Maintenance Schedule',
        excerpt: 'Platform maintenance will be performed during low-usage hours. See schedule for details.',
        date: 'This weekend',
        category: 'Maintenance',
        imageUrl: 'https://images.unsplash.com/photo-1563770660941-10a8fbc6d0f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: '#'
      }
    ]
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const addAlert = () => {
    const newKeyword = prompt('Enter a keyword to track:');
    if (newKeyword && newKeyword.trim() !== '') {
      setAlerts([
        ...alerts,
        { id: Date.now().toString(), keyword: newKeyword.trim(), isActive: true }
      ]);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-xl shadow-purple-900/20">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-xl font-medium text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            Explore AI Innovations
          </h2>
          <p className="text-white/60 text-sm mt-1">Stay updated with the latest in AI research and developments</p>
        </div>
        
        {/* Tabs */}
        <div className="px-6 pt-4 border-b border-white/10">
          <div className="flex gap-1 overflow-x-auto pb-4 no-scrollbar">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'trending'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Trending Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('research')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'research'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Research Papers
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('announcements')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'announcements'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              Announcements
            </motion.button>
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* News Cards */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: .3 }}
                className="space-y-6"
              >
                {newsItems[activeTab].map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 md:w-2/3 flex flex-col">
                        <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                        <p className="text-white/70 text-sm mb-4 flex-grow">{item.excerpt}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-xs text-white/50">{item.date}</span>
                          <motion.a
                            href={item.url}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-white/20 transition duration-200"
                          >
                            Read More
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Keyword Alerts */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">Keyword Alerts</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={addAlert}
                  className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </motion.button>
              </div>
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between">
                    <span className="text-sm text-white/80">#{alert.keyword}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleAlert(alert.id)}
                      className={`w-10 h-5 rounded-full flex items-center ${
                        alert.isActive ? 'bg-purple-600' : 'bg-white/20'
                      } transition-colors duration-300`}
                    >
                      <motion.div
                        animate={{ x: alert.isActive ? 5 : -5 }}
                        className={`w-4 h-4 rounded-full bg-white shadow-md transform ${
                          alert.isActive ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Popular Topics */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <h3 className="text-white font-medium mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['#AGI', '#LLMs', '#ComputerVision', '#AI Safety', '#NeurIPS', '#FineTuning', '#Ethics'].map((topic) => (
                  <motion.a
                    key={topic}
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg text-xs bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition duration-200"
                  >
                    {topic}
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Events */}
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5">
              <h3 className="text-white font-medium mb-4">Upcoming Webinar</h3>
              <p className="text-white/80 text-sm mb-3">Building Reliable AI Systems with Constitutional AI</p>
              <div className="flex justify-between items-center text-xs text-white/60 mb-4">
                <span>May 15, 2024</span>
                <span>1:00 PM EST</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium"
              >
                Register Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
