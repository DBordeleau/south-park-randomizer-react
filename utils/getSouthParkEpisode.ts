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
            const response = await fetch(`/api/fetchEpisode?season=${season}&episode=${episode}`);
            const data = await response.json();

            if (!response.ok || data.Response === "False") {
                console.error('Error from API:', data.Error || data.error);
                continue; // try a different episode
            }

            displayResult({
                Season: data.Season,
                Episode: data.Episode,
                Title: data.Title,
                Released: data.Released,
                Plot: data.Plot,
                Poster: data.Poster && data.Poster !== 'N/A' ? data.Poster : '', // OMDB uses "N/A" when there's no poster
            });
            return;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    displayNotice(allSeen
        ? "You've seen every episode! Clear your seen list to start over."
        : "Couldn't load an episode. Try again in a moment.", allSeen);
}
