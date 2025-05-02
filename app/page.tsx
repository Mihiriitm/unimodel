'use client';

import { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react';
import FloatingOrb from './components/FloatingOrb';
import ModelSelector from './components/ModelSelector';
import ExploreTab from './components/ExploreTab';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse follower effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  const rotateX = useTransform(smoothMouseY, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [0, window.innerWidth], [-5, 5]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  // Custom cursor gradient position
  const cursorGradientPosition = {
    background: `radial-gradient(600px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(120, 119, 198, 0.15), transparent 40%)`,
  };
  
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-700 via-purple-900 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500 via-blue-900 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-fuchsia-500/20 via-violet-600/10 to-transparent blur-3xl" />
      </div>
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      
      {/* Grid pattern */}
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Mouse-following gradient */}
      <div 
        className="fixed inset-0 pointer-events-none z-[5]"
        style={cursorGradientPosition}
      />

      {/* Interactive Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {isLoaded && Array.from({ length: 40 }).map((_, i) => {
          const size = Math.random() * 4 + 1;
          const duration = Math.random() * 60 + 20;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const delay = Math.random() * -30;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                x: `${initialX}vw`,
                y: `${initialY}vh`,
                background: i % 3 === 0 
                  ? 'linear-gradient(to right, #ff9cf7, #9e7cff)' 
                  : i % 3 === 1 
                  ? 'linear-gradient(to right, #7c9fff, #7cffd0)' 
                  : 'linear-gradient(to right, #f7f7f7, #cfcfcf)',
                boxShadow: `0 0 ${size * 2}px ${size/2}px rgba(${i % 3 === 0 ? '180, 120, 255' : i % 3 === 1 ? '124, 234, 255' : '255, 255, 255'}, 0.5)`,
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: [
                  `${initialX}vw`,
                  `${initialX + (Math.random() * 20 - 10)}vw`,
                  `${initialX + (Math.random() * 20 - 10)}vw`,
                  `${initialX + (Math.random() * 20 - 10)}vw`,
                ],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration,
                times: [0, 0.2, 0.8, 1],
                repeat: Infinity,
                delay,
                ease: "linear"
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto h-16">
            {/* Gradient border */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full"></div>
            
            <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-400">
                      UNIMODEL AI
                    </span>
                    <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-400/0 via-fuchsia-500/50 to-indigo-400/0"></span>
                  </span>
                </motion.div>
              </div>
              
              <div className="hidden md:flex items-center gap-6">
                <nav className="relative z-0 flex divide-x divide-white/5 rounded-full bg-black/20 backdrop-blur-xl shadow-lg shadow-purple-800/5 border border-white/5 p-1">
                  {['chat', 'models', 'explore'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 ${
                        activeTab === tab ? 'text-white' : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/80 to-indigo-600/80 shadow-lg shadow-purple-900/30"
                          layoutId="activeTab"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                      <span className="relative capitalize">{tab}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-6 py-2.5 rounded-full overflow-hidden shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                <span className="relative flex items-center justify-center text-white text-sm font-medium tracking-wide">
                  Sign In 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area with 3D tilt effect */}
        <motion.div 
          style={{ 
            rotateX: rotateX, 
            rotateY: rotateY, 
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
          className="pt-28 pb-32 min-h-screen flex justify-center items-center"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Suspense fallback={<div className="w-full max-w-4xl h-[600px] animate-pulse rounded-3xl bg-white/5" />}>
                  <FloatingOrb />
                </Suspense>
              </motion.div>
            )}
            
            {activeTab === 'models' && (
              <motion.div
                key="models"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Suspense fallback={<div className="w-full max-w-6xl h-[600px] animate-pulse rounded-3xl bg-white/5" />}>
                  <div className="w-full max-w-6xl mx-auto">
                    <ModelSelector />
                  </div>
                </Suspense>
              </motion.div>
            )}
            
            {activeTab === 'explore' && (
              <motion.div
                key="explore"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Suspense fallback={<div className="w-full max-w-6xl h-[600px] animate-pulse rounded-3xl bg-white/5" />}>
                  <div className="w-full max-w-6xl mx-auto">
                    <ExploreTab />
                  </div>
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Navigation */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 md:hidden z-50"
        >
          <div className="flex items-center bg-black/60 backdrop-blur-xl rounded-full border border-white/10 p-1.5 shadow-lg shadow-purple-900/20">
            {['chat', 'models', 'explore'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative p-3 rounded-full"
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeMobileTab"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className={`relative ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>
                  {tab === 'chat' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  ) : tab === 'models' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  )}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Ad Banner */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fixed bottom-0 left-0 right-0 h-[90px] backdrop-blur-xl border-t border-white/5 z-40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
            <div className="w-[728px] h-[90px] rounded-xl overflow-hidden relative group">
              {/* Animated gradient border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600/30 via-cyan-600/30 to-fuchsia-600/30 rounded-xl"></div>
              <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600/30 via-cyan-600/30 to-fuchsia-600/30 rounded-xl blur-sm animate-gradient"></div>
              
              {/* Ad content */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center rounded-xl border border-white/5">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 text-white/70 font-medium">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">AD</span>
                    <span>Upgrade to Premium for an Ad-Free Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Interactive Cursor (only visible on desktop) */}
      {isLoaded && (
        <motion.div
          className="fixed w-8 h-8 rounded-full pointer-events-none z-50 hidden md:flex items-center justify-center mix-blend-difference"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
            translateX: '-50%',
            translateY: '-50%'
          }}
        >
          <motion.div 
            className="w-full h-full rounded-full bg-white opacity-30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      )}
    </main>
  );
}
