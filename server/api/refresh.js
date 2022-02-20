const SpotifyWebApi = require("spotify-web-api-node");

module.exports = (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  const refreshToken = req.body?.refreshToken;

  if (!refreshToken) {
    res.status(400).send("Oops!");
    return;
  }

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};
