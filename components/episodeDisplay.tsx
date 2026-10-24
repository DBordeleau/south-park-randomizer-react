import React, { useEffect, useState } from 'react';
import GenerateEpisodeButton from '@/components/generateEpisodeButton';
import EpisodeCard from './episodeCard';
import { getEpisodeId, getSouthParkEpisode } from '../utils/getSouthParkEpisode';
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
    const [seenEpisodes, setSeenEpisodes] = useState<string[]>([]);
    const [notice, setNotice] = useState<string | null>(null);

    useEffect(() => {
        // Only attempt to access localStorage on the client side
        const seenEpisodesString = localStorage.getItem("seenEpisodes");
        setSeenEpisodes(seenEpisodesString ? JSON.parse(seenEpisodesString) : []);
    }, []);



    // Callback to update episodeData state
    const displayResult = (data: EpisodeData) => {
        console.log('Displaying result:', data);
        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setEpisodeData(data); // Update episode data after fade-out
            setFadeIn(true); // Trigger fade-in
        }, 400); // Wait for the fade-out duration
    };

    const generateEpisode = () => {
        setNotice(null);
        getSouthParkEpisode(displayResult, setNotice);
    };

    const markEpisodeAsSeen = () => {
        if (episodeData) {
            const episodeId = `${getEpisodeId(episodeData.Season, episodeData.Episode)}: ${episodeData.Title}`;
            if (!seenEpisodes.includes(episodeId)) {
                const updatedSeenEpisodes = [...seenEpisodes, episodeId];
                localStorage.setItem("seenEpisodes", JSON.stringify(updatedSeenEpisodes));
                setSeenEpisodes(updatedSeenEpisodes);
            }
            generateEpisode();
        }
    };

        // Fetch an episode when the component mounts (on page load)
        useEffect(() => {
            generateEpisode();
        }, []);

        return (
            <div className="flex flex-col items-center justify-between transition-all text-center">
                <GenerateEpisodeButton onClick={generateEpisode} />
                {notice ? (
                    <p className="bg-white text-black dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-2xl">{notice}</p>
                ) : (
                    <EpisodeCard episode={episodeData} fadeIn={fadeIn} />
                )}
                {episodeData && !notice && (
                    <button onClick={markEpisodeAsSeen} className="bg-red-500 hover:bg-red-600 border border-black text-white font-semibold py-2 px-4 rounded mt-4">
                        Already Seen It (Do not generate again)
                    </button>
                )}
                <SeenListButton seenEpisodes={seenEpisodes} setSeenEpisodes={setSeenEpisodes} />
            </div>
        );
    }