const SpotifyWebApi = require("spotify-web-api-node");

module.exports = (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  const code = req.body?.code;

  if (!code) {
    res.status(400).send("Oops!");
    return;
  }

  console.log(process.env.REDIRECT_URI);

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.status(500).send("Oops!");
    });
};
