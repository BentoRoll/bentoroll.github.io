// /api/tvdbFallback.js
export default async function handler(req, res) {
  const { series, season, episode } = req.query;

  if (!series || !season || !episode) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const apiKey = "d2aa2301-3707-4f18-ad4a-aa1ead84653a";

  try {
    // Step 1: Authenticate with TheTVDB to get a token
    const authRes = await fetch("https://api4.thetvdb.com/v4/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apikey: apiKey })
    });

    if (!authRes.ok) {
      const errorText = await authRes.text();
      throw new Error(`Auth failed: ${authRes.status} ${errorText}`);
    }

    const { data: { token } } = await authRes.json();

    // Step 2: Search for the series
    const searchRes = await fetch(
      `https://api4.thetvdb.com/v4/search?query=${encodeURIComponent(series)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!searchRes.ok) throw new Error(`Search failed ${searchRes.status}`);
    const searchData = await searchRes.json();

    const showId = searchData.data?.[0]?.tvdb_id;
    if (!showId) throw new Error("Series not found.");

    // Step 3: Fetch episode info
    const epRes = await fetch(
      `https://api4.thetvdb.com/v4/series/${showId}/episodes/official?page=0`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!epRes.ok) throw new Error(`Episode list failed ${epRes.status}`);
    const epData = await epRes.json();

    const episodeInfo = epData.data?.find(
      ep => ep.seasonNumber == season && ep.number == episode
    );

    if (!episodeInfo) throw new Error("Episode not found.");

    const result = {
      title: episodeInfo.name,
      description: episodeInfo.overview,
      cover: episodeInfo.image || episodeInfo.filename
    };

    res.status(200).json(result);
  } catch (err) {
    console.error("TVDB API Error:", err);
    res.status(500).json({ error: "Failed to fetch TVDB data.", details: err.message });
  }
}
