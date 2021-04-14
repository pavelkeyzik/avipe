import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Typography } from "@avipe/design-system";
import { useGenres } from "@avipe/core";
import { MainContentLayout } from "../../components/MainContentLayout";

function Genres() {
  const genresList = useGenres();

  if (genresList.isLoading) {
    return (
      <RootGrid>
        <Typography.H2>Genres</Typography.H2>
        <div>Loading...</div>
      </RootGrid>
    );
  }

  return (
    <RootGrid>
      <Typography.H2>Genres</Typography.H2>
      <GenresGrid>
        {genresList.data.map((genre: any) => (
          <GenreGridItem key={genre.id} to={`/genres/${genre.id}`}>
            {genre.name}
          </GenreGridItem>
        ))}
      </GenresGrid>
    </RootGrid>
  );
}

const RootGrid = styled(MainContentLayout)`
  display: grid;
  grid-gap: 20px;
`;

const GenresGrid = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  & > :not(:last-child) {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;

const GenreGridItem = styled(Link)`
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 8px;
`;

export { Genres };
