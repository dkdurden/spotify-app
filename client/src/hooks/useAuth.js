import React from "react";
import axios from "axios";

import { apiUrl } from "../utils/constants";

export function useAuth(code) {
  const [accessToken, setAccessToken] = React.useState();
  const [refreshToken, setRefreshToken] = React.useState();
  const [expiresIn, setExpiresIn] = React.useState();

  React.useEffect(() => {
    axios
      .post(`${apiUrl}/api/login`, { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);

        window.history.pushState({}, null, "/");
      })
      .catch(() => (window.location = "/"));
  }, [code]);

  React.useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return;
    }

    // Refresh access token 1 min before it expires
    const interval = setInterval(() => {
      axios
        .post(`${apiUrl}/refresh`)
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => (window.location = "/"));
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
