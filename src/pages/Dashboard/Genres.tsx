import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { useGenres } from "../../core/hooks/use-songs";

function Genres() {
  const genres = useGenres();

  return (
    <React.Fragment>
      <h2>Genres</h2>
      <GenresCards isLoading={genres.isLoading} genres={genres.data} />
    </React.Fragment>
  );
}

type GenresCardsProps = {
  isLoading?: boolean;
  genres?: any[];
};

function GenresCards(props: GenresCardsProps) {
  if (props.isLoading) {
    return <Fallback />;
  }

  if (!props.genres) {
    return <div>No Songs...</div>;
  }

  return (
    <GenresGrid>
      {props.genres.map((genre, index) => (
        <Link to={`/genres/${genre.id}`} key={index}>
          {genre.name}
        </Link>
      ))}
    </GenresGrid>
  );
}

function Fallback() {
  return (
    <GenresGrid>
      <div>Loading...</div>
    </GenresGrid>
  );
}

const GenresGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export { Genres };
