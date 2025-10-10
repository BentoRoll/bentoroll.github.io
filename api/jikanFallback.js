export default async function handler(req, res) {
  const { series, season, episode } = req.query;

  if (!series || !season || !episode) {
    return res.status(400).json({ error: "Missing series, season, or episode parameter" });
  }

  try {
    // Step 1: Search for the anime by title
    const searchResponse = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(series)}&limit=1`
    );
    const searchData = await searchResponse.json();

    if (!searchData.data || searchData.data.length === 0) {
      return res.status(404).json({ error: "Anime not found" });
    }

    const animeId = searchData.data[0].mal_id;

    // Step 2: Fetch episode data
    const episodeResponse = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/episodes/${episode}`
    );
    const episodeData = await episodeResponse.json();

    if (!episodeData.data) {
      return res.status(404).json({ error: "Episode not found" });
    }

    // Step 3: Prepare fallback data
    const result = {
      title: episodeData.data.title || `Episode ${episode}`,
      overview: episodeData.data.synopsis || "No description available.",
      cover: episodeData.data.images?.jpg?.image_url || null,
    };

    res.status(200).json(result);
  } catch (err) {
    console.error("Jikan fallback error:", err);
    res.status(500).json({ error: "Failed to fetch fallback data" });
  }
}
