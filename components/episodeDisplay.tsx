import React, { useCallback, useEffect, useRef, useState } from 'react';
import EpisodeCard, { primaryButton, secondaryButton } from './episodeCard';
import Header from './header';
import SeenList from './seenList';
import { DiceIcon, EyeOffIcon } from './icons';
import { EpisodeData, getEpisodeId, getSouthParkEpisode, loadSeasons } from '../utils/getSouthParkEpisode';

// Keeps the fade visible when an episode comes back from the cache almost instantly
const MIN_ROLL_MS = 250;

function saveSeenEpisodes(seenEpisodes: string[]) {
    if (seenEpisodes.length > 0) {
        localStorage.setItem("seenEpisodes", JSON.stringify(seenEpisodes));
    } else {
        localStorage.removeItem("seenEpisodes");
    }
}

export default function EpisodeDisplay() { // Renders the header, the episode card and the seen list
    const [episodeData, setEpisodeData] = useState<EpisodeData | null>(null);
    const [rolling, setRolling] = useState(false);
    const [seenEpisodes, setSeenEpisodes] = useState<string[]>([]);
    const [notice, setNotice] = useState<string | null>(null);
    const [allSeen, setAllSeen] = useState(false);
    const [totalEpisodes, setTotalEpisodes] = useState<number | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const sheetRef = useRef<HTMLDialogElement>(null);

    const generateEpisode = useCallback(() => {
        const started = Date.now();
        // Wait out the rest of the fade before swapping in the result
        const afterFade = (update: () => void) => setTimeout(() => {
            update();
            setRolling(false);
        }, Math.max(0, MIN_ROLL_MS - (Date.now() - started)));

        setRolling(true);
        getSouthParkEpisode(
            data => afterFade(() => {
                setEpisodeData(data);
                setNotice(null);
                setAllSeen(false);
            }),
            (message, everySeen) => afterFade(() => {
                setNotice(message);
                setAllSeen(everySeen);
            })
        );
    }, []);

    // Load the seen list and the first episode when the page opens
    useEffect(() => {
        const seenEpisodesString = localStorage.getItem("seenEpisodes");
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
        setSeenEpisodes(seenEpisodesString ? JSON.parse(seenEpisodesString) : []);
        generateEpisode();
        loadSeasons()
            .then(seasons => setTotalEpisodes(seasons.reduce((sum, episodes) => sum + episodes.length, 0)))
            .catch(() => setTotalEpisodes(null)); // the card shows its own error
    }, [generateEpisode]);

    const updateSeenEpisodes = (updated: string[]) => {
        saveSeenEpisodes(updated);
        setSeenEpisodes(updated);
        // Freeing up an episode means there's something to roll again
        if (allSeen && updated.length < seenEpisodes.length) {
            generateEpisode();
        }
    };

    const markEpisodeAsSeen = () => {
        if (episodeData) {
            const episodeId = `${getEpisodeId(episodeData.Season, episodeData.Episode)}: ${episodeData.Title}`;
            if (!seenEpisodes.includes(episodeId)) {
                const updated = [...seenEpisodes, episodeId];
                saveSeenEpisodes(updated);
                setSeenEpisodes(updated);
            }
            generateEpisode();
        }
    };

    const removeSeenEpisode = (entry: string) => updateSeenEpisodes(seenEpisodes.filter(e => e !== entry));
    const clearSeenEpisodes = () => updateSeenEpisodes([]);

    // Open the bottom sheet as a modal dialog so focus stays inside it and Escape closes it
    useEffect(() => {
        const sheet = sheetRef.current;
        if (!sheet) return;
        if (sheetOpen && !sheet.open) sheet.showModal();
        if (!sheetOpen && sheet.open) sheet.close();
    }, [sheetOpen]);

    // The sheet is only for narrow screens; the seen list sits beside the card once there's room
    useEffect(() => {
        const wide = window.matchMedia('(min-width: 960px)');
        const closeWhenWide = () => wide.matches && setSheetOpen(false);
        wide.addEventListener('change', closeWhenWide);
        return () => wide.removeEventListener('change', closeWhenWide);
    }, []);

    const seenListProps = {
        seenEpisodes,
        totalEpisodes,
        onRemove: removeSeenEpisode,
        onClear: clearSeenEpisodes,
    };

    return (
        <>
            <Header seenCount={seenEpisodes.length} seenListOpen={sheetOpen} onOpenSeenList={() => setSheetOpen(true)} />

            <main className="relative z-[2] mx-auto mt-2 flex w-full max-w-[1160px] flex-wrap items-start gap-6 px-4 sm:mt-[clamp(8px,3vw,40px)] sm:px-6">
                <EpisodeCard
                    episode={episodeData}
                    rolling={rolling}
                    notice={notice}
                    allSeen={allSeen}
                    onRoll={generateEpisode}
                    onMarkSeen={markEpisodeAsSeen}
                    onClearSeen={clearSeenEpisodes}
                />
                <aside aria-labelledby="seen-list-heading" className="glass hidden min-w-0 flex-[1_1_300px] flex-col gap-[18px] rounded-3xl border-[3px] border-edge p-6 shadow-paper-lg wide:flex">
                    <SeenList headingId="seen-list-heading" {...seenListProps} />
                </aside>
            </main>

            <dialog
                ref={sheetRef}
                aria-labelledby="seen-sheet-heading"
                onClose={() => setSheetOpen(false)}
                onClick={e => e.target === e.currentTarget && setSheetOpen(false)} // a click on the backdrop
                className="sheet mx-auto mb-0 mt-auto h-[min(640px,85dvh)] max-h-none w-full max-w-[560px] overflow-hidden rounded-t-3xl border-x-0 border-b-0 border-t-[3px] border-edge bg-card p-0 text-ink sm:border-x-[3px]"
            >
                <div className="flex h-full flex-col gap-4 px-5 pb-7 pt-2.5">
                    <div aria-hidden="true" className="h-[5px] w-11 flex-none self-center rounded-full bg-track" />
                    <SeenList headingId="seen-sheet-heading" onClose={() => setSheetOpen(false)} {...seenListProps} />
                </div>
            </dialog>

            {/* Phone action bar, so the main buttons stay under your thumb */}
            {!notice && !allSeen && (
                <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2.5 border-t-[3px] border-edge bg-card px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 sm:hidden">
                    <button type="button" onClick={markEpisodeAsSeen} disabled={rolling || !episodeData} className={`${secondaryButton} min-h-[54px] flex-none px-4 text-base`}>
                        <EyeOffIcon /> Seen it
                    </button>
                    <button type="button" onClick={generateEpisode} disabled={rolling} className={`${primaryButton} min-h-[54px] flex-1 px-4`}>
                        <DiceIcon /> {rolling ? 'Rolling…' : 'Roll another'}
                    </button>
                </div>
            )}
        </>
    );
}
