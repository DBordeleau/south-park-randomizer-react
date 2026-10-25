import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apikey = process.env.OMDB_API_KEY;
  const { season, episode } = req.query;

  if (!season || !episode) {
      return res.status(400).json({ error: 'Missing season or episode parameter' });
  }

  // Construct the OMDB API URL
  const url = `http://www.omdbapi.com/?i=tt0121955&Season=${season}&Episode=${episode}&apikey=${apikey}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`OMDB API returned status ${response.status}`);
      }

      const data: any = await response.json();

      // New episodes start out on IMDb as stubs like "Episode #29.2" with no plot until someone fills them in
      const isPlaceholder = /^Episode #\d+\.\d+$/.test(data.Title) || !data.Plot || data.Plot === 'N/A';

      // Episode data never changes once it's filled in, so let Vercel's CDN serve repeat requests instead of invoking this function.
      // Placeholders only get a day so the real details show up soon after IMDb adds them
      if (data.Response !== 'False') {
          const maxAge = isPlaceholder ? 86400 : 2592000;
          res.setHeader('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=86400`);
      }

      // Only send the fields the client uses
      const { Season, Episode, Title, Released, Plot, Poster, Response, Error: omdbError } = data;
      res.status(200).json({ Season, Episode, Title, Released, Plot, Poster, Response, Error: omdbError });
  } catch (error) {
      console.error('Error fetching from OMDB API:', error);
      res.status(500).json({ error: 'Failed to fetch data from OMDB API' });
  }
}