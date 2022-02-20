const lyricsFinder = require("lyrics-finder");

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  if (!req.query?.artist || !req.query?.track) {
    res.status(400).send("Oops!");
    return;
  }

  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "No lyrics found.";

  res.json({ lyrics });
};
