import styled from "@emotion/styled";
import { useParams } from "react-router";
import { usePlayer } from "../core/hooks/use-player";
import { usePlaylist } from "../core/hooks/use-songs";
import { Card } from "../design-system/Card";
import { SoundCard } from "../design-system/SoundCard";

function Playlist() {
  const { id } = useParams();
  const player = usePlayer();
  const playlistInfo = usePlaylist(+id);

  function playPlaylist() {
    const songToPlay = playlistInfo.data.songs[0];

    if (songToPlay) {
      player.playSelectedSong(songToPlay);
    }
  }

  if (playlistInfo.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <Card.Content>
          <span>{playlistInfo.data.songs.length} Track(s)</span>
          <h2>{playlistInfo.data.name}</h2>
          <p>Created by {playlistInfo.data.author}</p>
        </Card.Content>
        <Card.PlayButton onClick={playPlaylist} />
      </Card>
      <h2>Songs</h2>
      <SoundsGridList>
        {playlistInfo.data.songs.map((song: any) => (
          <SoundCard
            key={song.id}
            songData={song}
            onClick={player.playSelectedSong}
            isPlaying={
              player.currentSong ? player.currentSong.id === song.id : false
            }
          />
        ))}
      </SoundsGridList>
    </div>
  );
}

const SoundsGridList = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export { Playlist };
