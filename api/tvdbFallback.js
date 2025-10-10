export default async function handler(req, res) {
  const { series, season, episode } = req.query;
  const apiKey = process.env.TVDB_API_KEY;

  if (!series || !season || !episode) {
    return res.status(400).json({ error: "Missing required query parameters." });
  }

  try {
    // Authenticate
    const tokenRes = await fetch("https://api4.thetvdb.com/v4/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apikey: apiKey })
    });
    const tokenData = await tokenRes.json();
    const token = tokenData.data.token;

    // Search series
    const searchRes = await fetch(`https://api4.thetvdb.com/v4/search?query=${encodeURIComponent(series)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const searchData = await searchRes.json();
    const seriesId = searchData.data?.[0]?.tvdb_id;
    if (!seriesId) return res.status(404).json({ error: "Series not found on TVDB." });

    // Fetch episodes
    const epsRes = await fetch(`https://api4.thetvdb.com/v4/series/${seriesId}/episodes/default?page=0`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const epsData = await epsRes.json();

    const ep = epsData.data.find(
      e => e.seasonNumber == parseInt(season) && e.number == parseInt(episode)
    );

    if (!ep) return res.status(404).json({ error: "Episode not found on TVDB." });

    res.status(200).json({
      title: ep.name,
      description: ep.overview || "",
      cover: ep.image || ""
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from TVDB" });
  }
}
