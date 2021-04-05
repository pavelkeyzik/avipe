import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { MainContentLayout } from "../../components/MainContentLayout";
import { useGenres } from "../../core/hooks/use-songs";

function Genres() {
  const genresList = useGenres();

  if (genresList.isLoading) {
    return (
      <RootGrid>
        <h2>Genres</h2>
        <div>Loading...</div>
      </RootGrid>
    );
  }

  return (
    <RootGrid>
      <h2>Genres</h2>
      <GenresGrid>
        {genresList.data.map((genre: any) => (
          <GenreGridItem to={`/genres/${genre.id}`}>{genre.name}</GenreGridItem>
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
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
`;

const GenreGridItem = styled(Link)`
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 8px;
`;

export { Genres };
