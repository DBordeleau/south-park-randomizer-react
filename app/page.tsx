import About from '@/components/about';
import EpisodeDisplay from '@/components/episodeDisplay';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/utils/site';

// Tells search engines the site's name and that it's a free web app
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    {
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
};

export default function Home() {
  return (
    // Bottom padding on phones keeps the card clear of the fixed action bar
    <div className="flex min-h-screen flex-col pb-28 sm:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <EpisodeDisplay />
      <About />
    </div>
  );
}
