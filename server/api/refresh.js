// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
// const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");

module.exports = (req, res) => {
  const refreshToken = req.body.refreshToken;

  console.log(req.body);

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
