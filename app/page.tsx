'use client';

import ThemeComponent from '@/components/themeComponent';
import EpisodeDisplay from '@/components/episodeDisplay';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="flex h-screen sm:mt-10 flex-col items-center overflow-y-auto">
      <ThemeComponent />
      <EpisodeDisplay />
    </main>
  );
}