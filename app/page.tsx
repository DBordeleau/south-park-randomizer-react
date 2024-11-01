'use client';

import ThemeComponent from '@/components/themeComponent';
import EpisodeDisplay from '@/components/episodeDisplay';
import SeenListButton from '@/components/seenListButton';

export default function Home() {
  return (
    <main className="flex sm:mt-32 flex-col items-center">
      <ThemeComponent />
      <EpisodeDisplay />
    </main>
  );
}