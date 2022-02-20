import { stringify } from "query-string";

import { auth } from "./constants";

export const getAuthUrl = () =>
  "https://accounts.spotify.com/authorize?" + stringify(auth);
