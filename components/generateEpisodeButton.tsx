'use client';
import { motion } from 'framer-motion';

import React from 'react'

    interface EpisodeButtonProps {
        onClick: () => void; // Define the onClick prop type correctly
    }
    
    const EpisodeButton: React.FC<EpisodeButtonProps> = ({ onClick }: EpisodeButtonProps) => { // rendered by episodeDisplay
        return (
            <button className="bg-white mt-1 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-900 rounded-full flex text-[1rem] items-center gap-2 dark:bg-gray-800/80 dark:hover:bg-gray-950 dark:text-white dark:outline-white dark:border-white/70 shadow-md mb-5 2xl:text-[1.35rem] hover:scale-110 transition-all" onClick={onClick}>
                Generate Random Episode
            </button>
        );
    };
    
    export default EpisodeButton;