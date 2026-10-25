import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/site';

// The API routes stay crawlable so Google can load an episode when it renders the page
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
