import styled from "@emotion/styled";
import { SoundPlaylist } from "../components/SoundPlaylist";
import { useSongsList } from "../core/hooks/use-songs";

function SoundList() {
  const songsList = useSongsList();

  if (songsList.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <RootGrid>
      <h2>All Sounds</h2>
      <SoundPlaylist songs={songsList.data} />
    </RootGrid>
  );
}

const RootGrid = styled.div`
  display: grid;
  grid-gap: 40px;
`;

export { SoundList };
