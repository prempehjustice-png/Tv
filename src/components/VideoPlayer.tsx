// @ts-nocheck
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { AlertCircle, WifiOff } from 'lucide-react';
import { Channel } from '../types';

interface VideoPlayerProps {
  channel: Channel;
}

export function VideoPlayer({ channel }: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Reset error state when channel changes
  useEffect(() => {
    setHasError(false);
    setIsPlaying(true);
  }, [channel]);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
      {/* 16:9 Aspect Ratio Container */}
      <div className="absolute inset-0">
        {!hasError ? (
          // @ts-ignore
          <ReactPlayer
            key={channel.url}
            url={channel.url}
            width="100%"
            height="100%"
            playing={isPlaying}
            controls={true}
            muted={true}
            onError={(e) => {
              console.error('Player error:', e);
              handleError();
            }}
            playsinline={true}
            config={{
              file: {
                forceHLS: true,
                attributes: {}
              }
            } as any}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a] border border-white/5 p-6 text-center">
            <WifiOff className="w-12 h-12 text-white/40 mb-4" />
            <h3 className="text-lg font-serif italic text-white/80 mb-2">
              Stream Unavailable
            </h3>
            <p className="text-sm text-white/50 max-w-md">
              This channel's stream is currently offline, geo-blocked in your region, or requires a different origin. Try selecting another channel from the guide.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
