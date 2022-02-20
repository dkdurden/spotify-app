import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

import { SearchResult } from "./SearchResult";
import { Player } from "./Player";
import { useAuth } from "../hooks/useAuth";
import { auth, apiUrl } from "../utils/constants";

const spotifyApi = new SpotifyWebApi({
  clientId: auth.client_id,
});

const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Input = styled(TextField)`
  width: 100%;
`;

const InputGroup = styled("div")`
  display: flex;
`;

const Songs = styled("div")`
  flex-grow: 1;
  overflow-y: auto;
`;

export function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [playingTrack, setPlayingTrack] = React.useState();
  const [lyrics, setLyrics] = React.useState("");

  React.useEffect(() => {
    if (!playingTrack) {
      return;
    }

    axios
      .get(`${apiUrl}/lyrics`, {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => setLyrics(res.data.lyrics));
  }, [playingTrack]);

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  React.useEffect(() => {
    if (!search) {
      return setSearchResults([]);
    }

    //   if (!accessToken) {
    //     return;
    //   }

    //   let cancel = false;
    //   spotifyApi.searchTracks(search).then((res) => {
    //     if (cancel) {
    //       return;
    //     }

    //     console.log(res);
    //   });

    //   return () => {
    //     cancel = true;
    //   };
  }, [search, accessToken]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  const handleChange = (e) => setSearch(e.target.value);

  const handleClick = (e) => {
    if (!search) {
      return setSearchResults([]);
    }

    if (!accessToken) {
      return;
    }

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  };

  return (
    <CustomContainer>
      <InputGroup>
        <Input
          id="search-bar"
          label="Filled"
          variant="filled"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={handleChange}
        />
        <IconButton aria-label="search" onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </InputGroup>

      <Songs>
        {searchResults.map((result) => (
          <SearchResult
            result={result}
            key={result.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div style={{ textAlign: "center", whiteSpace: "pre" }}>{lyrics}</div>
        )}
      </Songs>

      <div>
        <Player accessToken={accessToken} songUri={playingTrack?.uri} />
      </div>
    </CustomContainer>
  );
}
