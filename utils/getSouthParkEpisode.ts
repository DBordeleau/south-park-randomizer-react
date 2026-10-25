export interface EpisodeData {
    Season: number;
    Episode: number;
    Title: string;
    Released: string;
    Plot: string;
    Poster?: string;
}

const MAX_ATTEMPTS = 3;

let seasonsPromise: Promise<number[][]> | null = null;

// Fetch the episode numbers for each season once per page load
export function loadSeasons(): Promise<number[][]> {
    if (!seasonsPromise) {
        seasonsPromise = fetch('/api/seasons')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Seasons API returned status ${response.status}`);
                }
                return response.json();
            })
            .then(data => data.seasons as number[][])
            .catch(error => {
                seasonsPromise = null; // allow a retry on the next click
                throw error;
            });
    }
    return seasonsPromise;
}

// Seen list entries are stored as "S1E2: Title", this returns the "S1E2" part
export function getEpisodeId(season: number | string, episode: number | string) {
    return `S${season}E${episode}`;
}

// Turns "S1E2: Title" back into [1, 2]
export function parseEpisodeId(entry: string): [number, number] | null {
    const match = /^S(\d+)E(\d+)/.exec(entry);
    return match ? [Number(match[1]), Number(match[2])] : null;
}

// Fetches one episode's details, or null if OMDB doesn't have it
export async function fetchEpisode(season: number, episode: number): Promise<EpisodeData | null> {
    const response = await fetch(`/api/fetchEpisode?season=${season}&episode=${episode}`);
    const data = await response.json();

    if (!response.ok || data.Response === "False") {
        console.error('Error from API:', data.Error || data.error);
        return null;
    }

    return {
        Season: data.Season,
        Episode: data.Episode,
        Title: data.Title,
        Released: data.Released,
        // OMDB uses "N/A" when there's no plot or poster
        Plot: data.Plot && data.Plot !== 'N/A' ? data.Plot : '',
        Poster: data.Poster && data.Poster !== 'N/A' ? data.Poster : '',
    };
}

function getSeenEpisodeIds(): Set<string> {
    const seenEpisodesString = localStorage.getItem("seenEpisodes");
    const seenEpisodes: string[] = seenEpisodesString ? JSON.parse(seenEpisodesString) : [];
    return new Set(seenEpisodes.map(entry => entry.split(':')[0]));
}

export async function getSouthParkEpisode(displayResult: (data: EpisodeData) => void, displayNotice: (message: string, allSeen: boolean) => void) {
    let seasons: number[][];
    try {
        seasons = await loadSeasons();
    } catch (error) {
        console.error('Error fetching seasons:', error);
        displayNotice("Couldn't load the episode list. Try again in a moment.", false);
        return;
    }

    // Build the list of unseen episodes so every episode has the same chance of being picked
    const seenIds = getSeenEpisodeIds();
    const unseen: [number, number][] = [];
    seasons.forEach((episodes, index) => {
        episodes.forEach(episode => {
            if (!seenIds.has(getEpisodeId(index + 1, episode))) {
                unseen.push([index + 1, episode]);
            }
        });
    });

    const allSeen = unseen.length === 0;

    for (let attempt = 0; attempt < MAX_ATTEMPTS && unseen.length > 0; attempt++) {
        const [season, episode] = unseen.splice(Math.floor(Math.random() * unseen.length), 1)[0];

        try {
            const data = await fetchEpisode(season, episode);
            if (data) {
                displayResult(data);
                return;
            }
            // otherwise try a different episode
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    displayNotice(allSeen
        ? "You've seen every episode! Clear your seen list to start over."
        : "Couldn't load an episode. Try again in a moment.", allSeen);
}
