import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export function Player({ accessToken, songUri }) {
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    setPlay(true);
  }, [songUri]);

  const callback = (state) => {
    if (!state.isPlaying) {
      setPlay(false);
    }
  };

  if (!accessToken) {
    return null;
  }

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      uris={songUri ? [songUri] : []}
      callback={callback}
      play={play}
    />
  );
}
