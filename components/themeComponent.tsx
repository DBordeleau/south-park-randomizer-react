'use client';

import React from 'react';
import { useTheme } from '@/context/themeContext';
import { MoonIcon, SunIcon } from './icons';

export default function ThemeComponent() {
    const { theme, toggleTheme } = useTheme();

    // The icons switch on the dark class rather than the theme state, so the right one shows before hydration
    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
            className="press inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-[3px] border-edge bg-card text-ink shadow-paper-sm"
        >
            <span className="dark:hidden"><MoonIcon /></span>
            <span className="hidden dark:inline"><SunIcon /></span>
        </button>
    );
}
