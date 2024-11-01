'use client';

import React from 'react'
import EpisodeCard from './episodeCard';
import { getSouthParkEpisode } from '@/utils/getSouthParkEpisode';


    interface EpisodeButtonProps {
        onClick: () => void; // Define the onClick prop type correctly
    }
    
    const EpisodeButton: React.FC<EpisodeButtonProps> = ({ onClick }: EpisodeButtonProps) => { // rendered by episodeDisplay
        return (
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-900 rounded-full flex text-[1.35rem] items-center gap-2 dark:bg-gray-800/80 dark:hover:bg-gray-950 dark:text-white dark:outline-white shadow-md mb-5 hover:scale-105 transition" onClick={onClick}>
                Generate Random Episode
            </button>
        );
    };
    
    export default EpisodeButton;