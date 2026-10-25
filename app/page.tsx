'use client';

import EpisodeDisplay from '@/components/episodeDisplay';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <EpisodeDisplay />
      <Footer />
    </div>
  );
}
