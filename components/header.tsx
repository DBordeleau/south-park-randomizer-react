import React from 'react';
import ThemeComponent from './themeComponent';
import { ListIcon, SignIcon } from './icons';

interface HeaderProps {
    seenCount: number;
    seenListOpen: boolean;
    onOpenSeenList: () => void;
}

export default function Header({ seenCount, seenListOpen, onOpenSeenList }: HeaderProps) {
    return (
        <header className="relative z-10 mx-auto flex w-full max-w-[1160px] flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-5">
            <div className="flex items-center gap-2 sm:gap-2.5 rounded-2xl border-[3px] border-edge bg-card py-1 pl-1.5 pr-3 sm:py-1.5 sm:pl-2 sm:pr-4 shadow-paper-sm">
                <span className="sm:hidden"><SignIcon size={30} /></span>
                <span className="hidden sm:inline"><SignIcon /></span>
                <h1>
                    <span className="block font-display text-base sm:text-xl leading-none">South Park</span>
                    <span className="mt-0.5 block text-[9px] sm:text-[11px] font-bold uppercase tracking-[.2em]">Randomizer</span>
                </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5">
                {/* The seen list is always on screen at wide sizes, so the button only shows when it's tucked away */}
                <button
                    type="button"
                    onClick={onOpenSeenList}
                    aria-expanded={seenListOpen}
                    aria-haspopup="dialog"
                    aria-label={`Seen list, ${seenCount} ${seenCount === 1 ? 'episode' : 'episodes'}`}
                    className="press relative inline-flex h-11 w-11 sm:h-12 sm:w-auto items-center justify-center gap-2.5 rounded-full border-[3px] border-edge bg-card text-ink shadow-paper-sm sm:pl-4 sm:pr-2 font-semibold wide:hidden"
                >
                    <ListIcon />
                    <span className="hidden sm:inline" aria-hidden="true">Seen list</span>
                    <span aria-hidden="true" className="absolute -right-2 -top-2 inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full border-2 border-edge bg-accent2 px-1.5 text-[11px] font-bold text-[#16181D] sm:static sm:h-7 sm:min-w-7 sm:border-0 sm:text-[13px]">
                        {seenCount}
                    </span>
                </button>
                <ThemeComponent />
            </div>
        </header>
    );
}
