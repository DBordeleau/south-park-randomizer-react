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

      const data = await response.json();
      console.log('Data from OMDB:', data); // Log for debugging
      res.status(200).json(data);
  } catch (error) {
      console.error('Error fetching from OMDB API:', error);
      res.status(500).json({ error: 'Failed to fetch data from OMDB API' });
  }
}