'use client';

import dynamic from 'next/dynamic';

// Dynamically import components with loading fallbacks
const FloatingOrb = dynamic(() => import('./components/FloatingOrb'), {
  loading: () => <div className="animate-pulse bg-purple-100 rounded-3xl w-[800px] h-[600px]" />
});

const ModelSelector = dynamic(() => import('./components/ModelSelector'), {
  loading: () => <div className="animate-pulse bg-purple-100 rounded-full w-14 h-14" />
});

const ExploreTab = dynamic(() => import('./components/ExploreTab'), {
  loading: () => <div className="animate-pulse bg-purple-100 rounded-full w-12 h-12" />
});

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950" />
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                AI Platform
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <button className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all">
                Sign In
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-24 pb-16 flex justify-center items-center min-h-screen">
          <FloatingOrb />
        </div>

        {/* Model Selector */}
        <ModelSelector />

        {/* Explore Tab */}
        <ExploreTab />

        {/* Ad Banner */}
        <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
            <div className="w-[728px] h-[90px] bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-lg border border-purple-500/20 flex items-center justify-center text-gray-500">
              Ad Space (728x90)
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
