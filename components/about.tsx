import React from 'react';

// A short note about the site, rendered on the server so search engines have some text to read
export default function About() {
    return (
        <footer className="relative z-[2] mx-auto mt-6 w-full max-w-[1160px] px-4 sm:mt-8 sm:px-6">
            <p className="glass rounded-2xl border-2 border-edge px-5 py-3.5 text-sm leading-relaxed text-ink-soft">
                South Park Randomizer picks a random episode from every season of South Park, from the 1997 pilot to the latest season.
                Mark the ones you&apos;ve seen and they won&apos;t come up again.
            </p>
        </footer>
    );
}
