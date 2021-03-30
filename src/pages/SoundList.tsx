import styled from "@emotion/styled";
import { usePlayer } from "../core/hooks/use-player";
import { useSongsList } from "../core/hooks/use-songs";
import { SoundCard } from "../design-system/SoundCard";

function SoundList() {
  const player = usePlayer();
  const songsList = useSongsList();

  if (songsList.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <RootGrid>
      <h2>All Sounds</h2>
      <RootListGrid>
        {songsList.data.map((song: any) => (
          <SoundCard
            key={song.id}
            songData={song}
            onClick={player.playSelectedSong}
            isPlaying={
              player.currentSong ? player.currentSong.id === song.id : false
            }
          />
        ))}
      </RootListGrid>
    </RootGrid>
  );
}

const RootGrid = styled.div`
  display: grid;
  grid-gap: 40px;
`;

const RootListGrid = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export { SoundList };
