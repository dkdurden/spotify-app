import React from "react";
import styled from "@emotion/styled";

const Container = styled("button")`
  background: none;
  padding: 0.5rem;
  border: none;

  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  cursor: pointer;
`;

const Image = styled("div")`
  max-width: 64px;

  img {
    width: 100%;
    height: auto;
  }
`;

const Group = styled("div")`
  margin-left: 1rem;
`;

export function SearchResult({ result, chooseTrack }) {
  const handleClick = (e) => {
    console.log(result);
    chooseTrack(result);
  };

  return (
    <Container onClick={handleClick}>
      <Image>
        <img src={result.albumUrl} alt={result.title} width="64" height="64" />
      </Image>

      <Group>
        <div>{result.title}</div>
        <div>{result.artist}</div>
      </Group>
    </Container>
  );
}
