import React, { useState } from 'react';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <div className="text-4xl text-gray-800 mb-8 text-center">
        REMATE TOI CA ;)
      </div>
      <div className="relative w-3/4 max-w-4xl rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <video
          controls
          className="w-full rounded-lg"
          onPlay={handlePlay}
          onPause={handlePause}
        >
          <source src="/videos/video-live.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              onClick={() => {
                const videoElement = document.querySelector('video');
                if (videoElement) {
                  videoElement.play();
                }
                }}
                className="p-4 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-opacity duration-300"
                >
              <svg
                className="w-12 h-12 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}