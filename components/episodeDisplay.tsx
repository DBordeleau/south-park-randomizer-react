import React, { useEffect, useState } from 'react';
import GenerateEpisodeButton from '@/components/generateEpisodeButton';
import EpisodeCard from './episodeCard';
import { getSouthParkEpisode } from '../utils/getSouthParkEpisode';
import SeenListButton from './seenListButton';

interface EpisodeData {
    Season: number;
    Episode: number;
    Title: string;
    Released: string;
    Plot: string;
    Poster?: string;
}

export default function EpisodeDisplay() { // Component that renders generate episode button and the display card
    const [episodeData, setEpisodeData] = useState<EpisodeData | null>(null);
    const [fadeIn, setFadeIn] = useState(true);
    const [seenEpisodes, setSeenEpisodes] = useState<string[]>(() => {
        const seenEpisodesString = localStorage.getItem("seenEpisodes");
        return seenEpisodesString ? JSON.parse(seenEpisodesString) : [];
    });


    // Callback to update episodeData state
    const displayResult = (data: EpisodeData) => {
        console.log('Displaying result:', data);
        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setEpisodeData(data); // Update episode data after fade-out
            setFadeIn(true); // Trigger fade-in
        }, 400); // Wait for the fade-out duration
    };

    const markEpisodeAsSeen = () => {
        if (episodeData) {
            const episodeId = `S${episodeData.Season}E${episodeData.Episode}: ${episodeData.Title}`;
            if (!seenEpisodes.includes(episodeId)) {
                const updatedSeenEpisodes = [...seenEpisodes, episodeId];
                localStorage.setItem("seenEpisodes", JSON.stringify(updatedSeenEpisodes));
                setSeenEpisodes(updatedSeenEpisodes);
            }
            getSouthParkEpisode(displayResult);
        }
    };

        // Fetch an episode when the component mounts (on page load)
        useEffect(() => {
            getSouthParkEpisode(displayResult);
        }, []);

        return (
            <div className="flex flex-col items-center justify-between transition-all text-center">
                <GenerateEpisodeButton onClick={() => getSouthParkEpisode(displayResult)} />
                <EpisodeCard episode={episodeData} fadeIn={fadeIn} />
                {episodeData && (
                    <button onClick={markEpisodeAsSeen} className="bg-red-500 hover:bg-red-600 border border-black text-white font-semibold py-2 px-4 rounded mt-4">
                        Already Seen It (Do not generate again)
                    </button>
                )}
                <SeenListButton seenEpisodes={seenEpisodes} setSeenEpisodes={setSeenEpisodes} />
            </div>
        );
    }