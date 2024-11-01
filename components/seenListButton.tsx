import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SeenListButtonProps {
    seenEpisodes: string[];
    setSeenEpisodes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SeenListButton({ seenEpisodes, setSeenEpisodes }: SeenListButtonProps) {
    const [seenListVisible, setSeenListVisible] = useState(false);

    const toggleSeenList = () => setSeenListVisible(!seenListVisible);

    const clearSeenList = () => {
        localStorage.removeItem("seenEpisodes");
        setSeenEpisodes([]);
    };

    return (
        <div>
            <button
                className="bg-orange-400 hover:bg-orange-500 text-black font-semibold py-2 px-4 border border-black rounded-full mt-4"
                onClick={toggleSeenList}>
                {seenListVisible ? 'Hide Seen Episodes' : 'Show Seen Episodes'}
            </button>

            
        <AnimatePresence>
            {seenListVisible && ( // Render logic for seen list
                <motion.div className="mt-4 bg-white text-black dark:bg-black/85 dark:text-white p-4 rounded shadow"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ delay: 0.25 }}>
                    <h3 className="font-bold text-lg underline">Seen Episodes</h3>
                    {seenEpisodes.length > 0 ? ( // If seen list is visible and theres at least 1 episode in the list
                        <>
                            <ul className="mb-4 max-h-[10rem] overflow-y-auto">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white border border-black font-semibold py-2 px-4 rounded"
                                onClick={clearSeenList}>
                                Clear Seen List
                            </button>
                                {seenEpisodes.map(ep => 
                                <motion.li 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }} key={ep}>{ep}</motion.li>)}
                            </ul>
                        </>
                    ) : (
                        <p>No episodes have been marked as seen.</p>
                    )}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
}