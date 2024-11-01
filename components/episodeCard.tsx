import Image from 'next/image';
import React from 'react'

interface EpisodeData {
  Season: number;
  Episode: number;
  Title: string;
  Released: string;
  Plot: string;
  Poster?: string;
}

interface EpisodeCardProps {
  episode: EpisodeData | null; 
  fadeIn: boolean; 
}

export default function EpisodeCard({ episode, fadeIn }: EpisodeCardProps) {
  const fadeClass = fadeIn ? 'fade-in' : 'fade-out';

      if (!episode) { //render loading circle when episode is null/undefined
        return <div id="episodeCard" className={`bg-white dark:bg-gray800 p-4 rounded transition-all ${fadeClass}`}>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
        </div>;
    }

        return (
          <div id="episodeCard" className={`bg-white text-black dark:bg-black/10 dark:text-white w-full sm:w-[27.5rem] rounded-lg shadow-2xl transition-all min-h-[22rem] ${fadeClass}`}>
              {episode.Poster && <img className="hidden max-h-[18rem] w-full sm:block object-cover h-[16.15625rem] sm:w-[27.5rem] rounded-t-lg" src={episode.Poster} alt={`Poster for ${episode.Title}`} />}
              <div className="px-6 py-4">
                  <div id="episodeTitle" className="font-bold text-xl mb-2">
                      S{episode.Season}E{episode.Episode}: {episode.Title}
                  </div>
                  <div id="releasedText" className="text-sm text-gray-600 dark:text-gray-300 mb-2">Released: {episode.Released}</div>
                  <p id="synopsisText" className="min-h-[8rem] max-h-[10rem] overflow-y-auto">{episode.Plot}</p>
              </div>
          </div>
        );
}