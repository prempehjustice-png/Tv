import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { VideoPlayer } from './components/VideoPlayer';
import { channels } from './data/channels';
import { Channel } from './types';

export default function App() {
  const [currentChannel, setCurrentChannel] = useState<Channel>(channels[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#050505] text-[#E4E3E0] overflow-hidden font-sans select-none">
      <Sidebar 
        currentChannel={currentChannel} 
        onSelectChannel={setCurrentChannel} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full relative">
        {/* Header */}
        <nav className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/10 shrink-0 bg-[#0a0a0a]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden lg:flex gap-8 text-sm uppercase tracking-[0.2em] font-medium opacity-60">
              <span className="text-white opacity-100 border-b border-brand pb-1">Live Guide</span>
              <span className="hover:opacity-100 transition-opacity cursor-pointer">On Demand</span>
              <span className="hover:opacity-100 transition-opacity cursor-pointer">Categories</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right mr-4 hidden sm:block">
              <p className="text-xs opacity-50 uppercase tracking-tighter">Connection</p>
              <p className="text-sm font-mono text-green-400">OPTIMAL</p>
            </div>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 border border-white/20"></div>
          </div>
        </nav>

        {/* Video & Info Section */}
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 lg:px-10 py-6 flex flex-col mt-2">
          
          {/* Main Video Wrapper */}
          <div className="w-full relative shrink-0">
            {/* Ambient glow behind player */}
            <div className="absolute -inset-0.5 bg-brand/10 rounded-xl blur-xl opacity-30 lg:opacity-50" />
            <VideoPlayer channel={currentChannel} />
          </div>

          {/* Stream Information */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6 p-6 rounded-lg bg-white/5 border border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-red-600 text-[10px] font-bold rounded-sm animate-pulse text-white">LIVE</span>
                <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">{currentChannel.country}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif italic mb-2 leading-tight text-white">{currentChannel.name}</h2>
              <p className="text-sm opacity-70 leading-relaxed max-w-2xl">
                You are currently tuned into the {currentChannel.category} broadcast. 
                Live reporting and streaming direct from {currentChannel.country}.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-0">
              <div className="px-3 py-1.5 rounded bg-white/10 border border-white/5 text-xs text-white/60 font-mono tracking-widest uppercase">
                1080P/60FPS
              </div>
              <div className="px-3 py-1.5 rounded bg-white/10 border border-white/5 text-xs text-brand font-mono tracking-widest uppercase">
                HLS ACTIVE
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="h-10 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between px-6 lg:px-10 text-[10px] uppercase tracking-[0.2em] opacity-50 shrink-0 font-medium pb-safe">
          <div className="flex gap-6">
            <span className="hidden sm:inline">Current Region: Global (Roaming)</span>
          </div>
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Server Status: Optimal
            </span>
            <span className="hidden sm:inline">© 2026 Globo TV</span>
          </div>
        </div>
      </main>
    </div>
  );
}
