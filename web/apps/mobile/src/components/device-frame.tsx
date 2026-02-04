"use client";

import { useState } from "react";
import { Smartphone, Monitor, RotateCcw, ExternalLink } from "lucide-react";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export function DeviceFrame({ children }: DeviceFrameProps) {
  const [showFrame, setShowFrame] = useState(true);

  if (!showFrame) {
    return (
      <div className="min-h-screen bg-background">
        <button
          onClick={() => setShowFrame(true)}
          className="fixed top-4 right-4 z-50 p-2 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors"
        >
          <Smartphone className="h-5 w-5" />
        </button>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
      {/* Header */}
      <div className="text-center mb-6 text-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white font-display text-xl font-bold">R</span>
          </div>
          <h1 className="font-display text-2xl font-bold">Radiance Wellness</h1>
        </div>
        <p className="text-gray-400 text-sm">Mobile App Preview</p>
      </div>

      {/* Device Frame */}
      <div className="relative">
        {/* Phone Frame */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/50">
          {/* Inner bezel */}
          <div className="bg-black rounded-[2.5rem] p-1">
            {/* Screen container */}
            <div className="relative bg-background rounded-[2.25rem] overflow-hidden" style={{ width: "375px", height: "812px" }}>
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50 flex items-center justify-center">
                <div className="w-20 h-1 bg-gray-800 rounded-full" />
              </div>
              
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-background z-40 flex items-end justify-between px-8 pb-1">
                <span className="text-xs font-medium">9:41</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
                  </svg>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 4h-3V2h-4v2H7v18h10V4z"/>
                  </svg>
                </div>
              </div>

              {/* App content */}
              <div className="h-full overflow-y-auto mobile-scroll pt-12 pb-0">
                {children}
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full z-50" />
            </div>
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-1 top-28 w-1 h-8 bg-gray-700 rounded-l-lg" />
        <div className="absolute -left-1 top-44 w-1 h-16 bg-gray-700 rounded-l-lg" />
        <div className="absolute -left-1 top-64 w-1 h-16 bg-gray-700 rounded-l-lg" />
        <div className="absolute -right-1 top-36 w-1 h-20 bg-gray-700 rounded-r-lg" />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setShowFrame(false)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
        >
          <Monitor className="h-4 w-4" />
          Fullscreen
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
        >
          <RotateCcw className="h-4 w-4" />
          Restart
        </button>
      </div>

      {/* Info */}
      <div className="mt-8 text-center text-gray-500 text-sm max-w-md">
        <p>This is a preview of the Radiance Wellness mobile app.</p>
        <p className="mt-1">The production app will be built with Flutter for iOS and Android.</p>
      </div>
    </div>
  );
}
