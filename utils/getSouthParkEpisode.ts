export interface EpisodeData {
    Season: number;
    Episode: number;
    Title: string;
    Released: string;
    Plot: string;
    Poster?: string;
}

export function getSouthParkEpisode(displayResult: (data: EpisodeData) => void) {
    const season = Math.floor(Math.random() * 26) + 1;
    let episode: number | null = null;

    // Set episode based on season count logic
    switch (season) {
        case 1: episode = Math.floor(Math.random() * 13) + 1; break; // 13 episodes in season 1
        case 2: episode = Math.floor(Math.random() * 18) + 1; break; // 18 episodes in season 2
        case 3:
        case 4:
        case 6: episode = Math.floor(Math.random() * 17) + 1; break; // 17 episodes in seasons 3, 4, 6
        case 5: episode = Math.floor(Math.random() * 14) + 1; break; // 14 episodes in season 5
        case 7: episode = Math.floor(Math.random() * 15) + 1; break; // 15 episodes in season 7
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16: episode = Math.floor(Math.random() * 14) + 1; break; // 14 episodes in seasons 8-16
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23: episode = Math.floor(Math.random() * 10) + 1; break; // 10 episodes in seasons 17-23
        case 25:
        case 26: episode = Math.floor(Math.random() * 6) + 1; break; // 6 episodes in seasons 25-26
    }

    // Log the generated season and episode
    console.log(`Generated season: ${season}, episode: ${episode}`);

    // Ensure episode is defined before making the fetch call
    if (episode === null) {
        console.error('Episode number could not be determined.');
        getSouthParkEpisode(displayResult)
    }

    // Fetch the episode data from the Next.js API route
    fetch(`/api/fetchEpisode?season=${season}&episode=${episode}`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched episode data:', data); // Log the data here

            if (data.Response === "False") {
                console.error('Error from API:', data.Error);
                return; // Early exit if API returns an error
            }

            // Assuming the response data structure matches EpisodeData
            const formattedData: EpisodeData = {
                Season: data.Season,
                Episode: data.Episode,
                Title: data.Title,
                Released: data.Released,
                Plot: data.Plot,
                Poster: data.Poster || '', // Default to empty string if no poster
            };

            const episodeId = `S${formattedData.Season}E${formattedData.Episode}`;
            const seenEpisodesString = localStorage.getItem("seenEpisodes");
            const seenEpisodes: string[] = seenEpisodesString ? JSON.parse(seenEpisodesString) : [];

            // If the episode has been seen, fetch another one
            if (seenEpisodes.includes(episodeId)) {
                getSouthParkEpisode(displayResult); // retry if episode already seen
            } else {
                displayResult(formattedData); // call callback to display the result
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
