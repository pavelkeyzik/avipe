import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { Typography } from "@avipe/design-system";
import { useGenre } from "@avipe/core";
import { MainContentLayout } from "../../components/MainContentLayout";
import { SoundPlaylist } from "../../components/SoundPlaylist";

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

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export { SoundsByGenre };
