'use client';

import EpisodeDisplay from '@/components/episodeDisplay';

export default function Home() {
  return (
    // Bottom padding on phones keeps the card clear of the fixed action bar
    <div className="flex min-h-screen flex-col pb-28 sm:pb-10">
      <EpisodeDisplay />
    </div>
  );
}
