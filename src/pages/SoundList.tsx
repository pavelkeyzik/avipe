import styled from "@emotion/styled";
import { usePlayer } from "../core/hooks/use-player";
import { useSongsList } from "../core/hooks/use-songs";
import { Card } from "../design-system/Card";
import { SoundCard } from "../design-system/SoundCard";

function SoundList() {
  const player = usePlayer();
  const songsList = useSongsList();

  if (songsList.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <RootGrid>
      <Card>
        <h2>Meditation 101</h2>
        <p>Techniques, Benefits, and a Beginner’s How-To</p>
        <Card.PlayButton />
      </Card>
      <RootListGrid>
        {songsList.data.map((song: any) => (
          <SoundCard
            key={song.id}
            songData={song}
            coverURL="https://source.unsplash.com/user/pavelkeyzik/80x80"
            title={song.name}
            time={30}
            onClick={player.play}
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
