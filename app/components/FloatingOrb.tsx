'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
}

export default function FloatingOrb() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [pulseButton, setPulseButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Visual effect for container hover
  const containerX = useMotionValue(0);
  const containerY = useMotionValue(0);
  
  // Reflective movement based on mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center as percentage
      const distanceX = (e.clientX - centerX) / (rect.width / 2);
      const distanceY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply subtle tilt effect (max 2 degrees)
      containerX.set(distanceY * -2);
      containerY.set(distanceX * 2);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerX, containerY]);
  
  const springConfig = { damping: 20, stiffness: 250 };
  const smoothX = useSpring(containerX, springConfig);
  const smoothY = useSpring(containerY, springConfig);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Pulse the send button when input has content
  useEffect(() => {
    if (inputValue.trim().length > 0 && !pulseButton) {
      setPulseButton(true);
    } else if (inputValue.trim().length === 0 && pulseButton) {
      setPulseButton(false);
    }
  }, [inputValue, pulseButton]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate AI thinking and responding
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        type: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Simple mock AI response function
  const getAIResponse = (query: string): string => {
    const responses = [
      "I'm analyzing that request now. Can you provide more details?",
      "That's an interesting question. Based on my knowledge, I'd approach it this way...",
      "I've processed your request and found some relevant information.",
      "I'm not sure I understand. Could you rephrase that?",
      "Here's what I found about that topic. Let me know if you need more specific information."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* 3D-effect container */}
      <motion.div 
        ref={containerRef}
        style={{ 
          rotateX: smoothX,
          rotateY: smoothY,
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="relative group"
      >
        {/* Ambient Glow Effects */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-violet-600/20 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>
        
        {/* Chat Container */}
        <div className="relative bg-black/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform-gpu">
          {/* Ambient Lighting Effects */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>
          
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5 animate-gradient-slow"></div>
          
          {/* Reflective Top Panel */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
          
          {/* Chat Header */}
          <div className="relative px-6 py-4 border-b border-white/10 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1.5">
                <motion.span 
                  className="w-3 h-3 rounded-full bg-red-500/90"
                  whileHover={{ scale: 1.2 }}
                />
                <motion.span 
                  className="w-3 h-3 rounded-full bg-yellow-500/90"
                  whileHover={{ scale: 1.2 }}
                />
                <motion.span 
                  className="w-3 h-3 rounded-full bg-green-500/90"
                  whileHover={{ scale: 1.2 }}
                />
              </div>
              <h3 className="text-white font-medium text-sm">AI Chat Assistant</h3>
            </div>
            
            <div className="flex items-center text-xs text-white/60 gap-3">
              <div className="flex items-center gap-1.5">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
                <span>Online</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-white/90 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          {/* Messages Area */}
          <div 
            className="h-[400px] md:h-[500px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            onClick={focusInput}
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 text-white/70">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-700/20"
                    animate={{ 
                      boxShadow: [
                        "0 10px 25px -5px rgba(129, 140, 248, 0.2)", 
                        "0 15px 30px -5px rgba(129, 140, 248, 0.3)", 
                        "0 10px 25px -5px rgba(129, 140, 248, 0.2)"
                      ],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                </motion.div>

                <div className="max-w-sm">
                  <h4 className="text-xl font-medium text-white mb-2">How can I help you today?</h4>
                  <motion.p 
                    className="text-sm text-white/60"
                    animate={{ opacity: [0.6, 0.8, 0.6] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    Ask me anything about AI models, data analysis, coding challenges, or other topics.
                  </motion.p>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    onClick={focusInput}
                    className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors duration-300 mx-auto text-sm text-white/80 font-medium"
                  >
                    Start a conversation
                  </motion.div>
                </div>
              </div>
            ) : (
              <>
                <AnimatePresence initial={false} mode="popLayout">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ 
                        duration: 0.4,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'ai' && (
                        <motion.div 
                          className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center mr-3 flex-shrink-0 shadow-lg shadow-indigo-600/30"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          initial={{ rotate: -5, scale: 0.8 }}
                          animate={{ rotate: 0, scale: 1 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </motion.div>
                      )}
                      
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'ml-12' : ''}`}>
                        <motion.div
                          className={`p-4 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-700/20'
                              : 'bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-tl-none'
                          }`}
                          whileHover={{ scale: 1.01 }}
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                        >
                          <p className="text-sm">{message.content}</p>
                        </motion.div>
                        <div className={`mt-1 text-xs text-white/40 ${message.type === 'user' ? 'text-right' : ''}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      
                      {message.type === 'user' && (
                        <motion.div 
                          className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center ml-3 flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          initial={{ rotate: 5, scale: 0.8 }}
                          animate={{ rotate: 0, scale: 1 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <motion.div 
                      className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center mr-3 flex-shrink-0 shadow-md"
                      animate={{ 
                        scale: [1, 1.05, 1], 
                        rotate: [0, 2, -2, 0] 
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                    <div className="p-4 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 text-white rounded-tl-none">
                      <div className="flex space-x-2">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-white/70" 
                          animate={{ y: [0, -6, 0] }}
                          transition={{ 
                            duration: 0.8, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 0 
                          }}
                        />
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-white/70" 
                          animate={{ y: [0, -6, 0] }}
                          transition={{ 
                            duration: 0.8, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 0.2 
                          }}
                        />
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-white/70" 
                          animate={{ y: [0, -6, 0] }}
                          transition={{ 
                            duration: 0.8, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 0.4 
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 relative z-10">
            <motion.div 
              className={`relative flex items-center bg-white/5 backdrop-blur-sm rounded-xl border transition-colors duration-300 ${
                isFocused ? 'border-indigo-500/50 shadow-[0_0_15px_rgba(129,140,248,0.2)]' : 'border-white/10'
              }`}
            >
              <motion.button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-purple-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </motion.button>
              
              <motion.div 
                className="flex-1"
                initial={false}
                animate={
                  isFocused ? { 
                    scale: 1.01, 
                    transition: { type: "spring", stiffness: 300, damping: 15 } 
                  } : { 
                    scale: 1, 
                    transition: { duration: 0.2 } 
                  }
                }
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="flex-1 w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/30 px-3 py-3"
                />
              </motion.div>
              
              <div className="flex mr-1">
                <motion.button 
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-purple-300 mr-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputValue.trim()}
                  className={`relative overflow-hidden flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    isTyping || !inputValue.trim()
                      ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                      : 'text-white cursor-pointer'
                  }`}
                >
                  {/* Animated gradient background */}
                  {inputValue.trim() && !isTyping && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  
                  {/* Pulsing effect */}
                  {pulseButton && !isTyping && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(139, 92, 246, 0.4)",
                          "0 0 0 8px rgba(139, 92, 246, 0)",
                        ],
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  )}
                  
                  <span className="relative flex items-center z-10 font-medium">
                    <span className="mr-1">Send</span>
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={pulseButton ? { x: [0, 4, 0] } : {}}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" transform="rotate(90 12 12)"/>
                    </motion.svg>
                  </span>
                </motion.button>
              </div>
            </motion.div>
            
            <div className="mt-3 text-xs text-center text-white/40">
              <p>UniModel may produce inaccurate information about people, places, or facts.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
