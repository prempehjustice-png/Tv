import React from 'react';
import { Play, Radio, MonitorPlay } from 'lucide-react';
import { Channel } from '../types';
import { groupChannelsByCountry } from '../data/channels';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentChannel: Channel | null;
  onSelectChannel: (channel: Channel) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentChannel, onSelectChannel, isOpen, onClose }: SidebarProps) {
  const groupedChannels = groupChannelsByCountry();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10 h-20 shrink-0">
          <h1 className="text-2xl font-bold tracking-tighter font-serif italic text-white flex items-center">
            GLOBO<span className="text-brand">TV</span>
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto w-full py-6 space-y-8">
          {Object.entries(groupedChannels).map(([country, channels]) => (
            <div key={country} className="px-6 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40">{country}</h3>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/70">{channels.length} Channels</span>
              </div>
              <div className="space-y-3">
                {channels.map((channel) => {
                  const isActive = currentChannel?.id === channel.id;
                  
                  return (
                    <button
                      key={channel.id}
                      onClick={() => {
                        onSelectChannel(channel);
                        onClose();
                      }}
                      className={cn(
                        "w-full text-left p-4 rounded-lg transition-all duration-300 group relative",
                        isActive 
                          ? "bg-brand/10 border border-brand/30 ring-1 ring-brand/20" 
                          : "bg-white/5 border border-white/5 opacity-60 hover:opacity-100 hover:bg-white/10"
                      )}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className={cn("font-bold text-sm", isActive ? "text-brand" : "text-white")}>{channel.name}</p>
                        {isActive && <span className="text-[10px] opacity-60 text-brand font-mono">LIVE</span>}
                      </div>
                      <p className="text-xs opacity-60 truncate block group-hover:hidden">{channel.category} Broadcast</p>
                      
                      {/* Expandable program info on hover */}
                      <div className="hidden group-hover:block text-xs leading-relaxed text-white/80 animate-in fade-in slide-in-from-top-1">
                        {channel.programInfo || `You are currently tuned into the ${channel.category} broadcast from ${channel.country}.`}
                      </div>
                      
                      {isActive && (
                        <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                          <div className="w-2/3 h-full bg-brand shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
