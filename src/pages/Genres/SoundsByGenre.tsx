import styled from "@emotion/styled";
import { useParams } from "react-router";
import { MainContentLayout } from "../../components/MainContentLayout";
import { SoundPlaylist } from "../../components/SoundPlaylist";
import { useGenre } from "../../core/hooks/use-songs";

function SoundsByGenre() {
  const { id } = useParams();
  const genre = useGenre(+id);

  return (
    <RootGrid>
      <h2>Sounds By Genre</h2>
      <SoundPlaylist isLoading={genre.isLoading} songs={genre.data?.songs} />
    </RootGrid>
  );
}

const RootGrid = styled(MainContentLayout)`
  display: grid;
  grid-gap: 20px;
`;

export { SoundsByGenre };
