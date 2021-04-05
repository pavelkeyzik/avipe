import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { MainContentLayout } from "../../components/MainContentLayout";
import { useGenres } from "../../core/hooks/use-songs";

function Genres() {
  const genresList = useGenres();

  if (genresList.isLoading) {
    return (
      <MainContentLayout>
        <h2>Genres</h2>
        <div>Loading...</div>
      </MainContentLayout>
    );
  }

  return (
    <MainContentLayout>
      <h2>Genres</h2>
      <GenresGrid>
        {genresList.data.map((genre: any) => (
          <GenreGridItem to={`/genres/${genre.id}`}>{genre.name}</GenreGridItem>
        ))}
      </GenresGrid>
    </MainContentLayout>
  );
}

const GenresGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 30px;
`;

const GenreGridItem = styled(Link)`
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 8px;
`;

export { Genres };
