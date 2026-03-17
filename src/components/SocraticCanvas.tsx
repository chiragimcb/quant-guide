import React from 'react';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { Ghost } from 'lucide-react';

const SocraticCanvas: React.FC = () => {
  return (
    <div className="relative h-full w-full overflow-hidden border-teal-100 bg-white">
      {/* 
        The canvas wrapper has touch-action: none to ensure perfect Apple Pencil 
        palm rejection and prevent browser scrolling/bouncing as per requirements.
      */}
      <div className="h-full w-full touch-none" style={{ touchAction: 'none' }}>
        <Tldraw 
          inferDarkMode={false}
          autoFocus={true}
        />
      </div>

      {/* The Ghost Button (FAB) */}
      <button 
        className="absolute bottom-6 right-6 z-[1000] flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-full shadow-2xl transition-all active:scale-95 group focus:outline-none focus:ring-4 focus:ring-indigo-300"
        aria-label="Ask the Ghost"
        onClick={() => console.log('Ghost interaction triggered')}
      >
        <Ghost className="w-6 h-6 group-hover:animate-pulse" />
        <span className="font-semibold tracking-wide">Ask the Ghost</span>
      </button>
    </div>
  );
};

export default SocraticCanvas;
