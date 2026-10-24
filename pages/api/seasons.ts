import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch';

// Returns the aired episode numbers for every season, e.g. { seasons: [[1, 2, ...], [1, 2, ...]] }
// New seasons are picked up automatically as OMDB adds them
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apikey = process.env.OMDB_API_KEY;
  const baseUrl = `http://www.omdbapi.com/?i=tt0121955&apikey=${apikey}`;

  try {
      const showResponse = await fetch(baseUrl);
      if (!showResponse.ok) {
          throw new Error(`OMDB API returned status ${showResponse.status}`);
      }

      const show: any = await showResponse.json();
      const totalSeasons = parseInt(show.totalSeasons, 10);
      if (!totalSeasons) {
          throw new Error(`OMDB API returned no season count: ${JSON.stringify(show)}`);
      }

      const seasonNumbers = Array.from({ length: totalSeasons }, (_, i) => i + 1);
      const seasonData: any[] = await Promise.all(
          seasonNumbers.map(season => fetch(`${baseUrl}&Season=${season}`).then(response => response.json()))
      );

      // Skip episodes that haven't aired yet, since OMDB has no plot for them
      const now = Date.now();
      const seasons = seasonData.map(data =>
          data.Response === 'True'
              ? data.Episodes
                  .filter((ep: any) => ep.Released !== 'N/A' && Date.parse(ep.Released) <= now)
                  .map((ep: any) => parseInt(ep.Episode, 10))
                  .filter((episode: number) => episode > 0)
              : []
      );

      // Refresh once a day so new episodes show up without hitting OMDB on every visit
      res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
      res.status(200).json({ seasons });
  } catch (error) {
      console.error('Error fetching seasons from OMDB API:', error);
      res.status(500).json({ error: 'Failed to fetch seasons from OMDB API' });
  }
}
