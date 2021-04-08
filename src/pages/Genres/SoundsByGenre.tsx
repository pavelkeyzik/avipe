import styled from "@emotion/styled";
import { useParams } from "react-router";
import { MainContentLayout } from "../../components/MainContentLayout";
import { SoundPlaylist } from "../../components/SoundPlaylist";
import { useGenre } from "../../core/hooks/use-songs";
import { Typography } from "../../design-system";

function SoundsByGenre() {
  const { id } = useParams();
  const genre = useGenre(+id);

  return (
    <RootGrid>
      <Typography.H2>Sounds By Genre</Typography.H2>
      <SoundPlaylist isLoading={genre.isLoading} songs={genre.data?.songs} />
    </RootGrid>
  );
}

const RootGrid = styled(MainContentLayout)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export { SoundsByGenre };
