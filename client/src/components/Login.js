import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { getAuthUrl } from "../utils/helpers";

export function Login() {
  return (
    <Container>
      <Button component="a" href={getAuthUrl()} variant="contained">
        Login with Spotify
      </Button>
    </Container>
  );
}
