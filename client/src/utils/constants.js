const redirect_uri =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001"
    : "https://determined-booth-c5c2f9.netlify.app";

export const auth = {
  client_id: "5ba9957c47344e59adac7cb6d177cea9",
  response_type: "code",
  redirect_uri,
  scope:
    "streaming user-read-email user-read-private user-library-read user-top-read user-library-modify user-read-playback-state user-modify-playback-state",
};

export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://spotify-app-dkdurden.vercel.app";
