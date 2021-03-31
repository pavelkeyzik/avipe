import { useParams } from "react-router";
import { SoundPlaylist } from "../components/SoundPlaylist";
import { usePlayer } from "../core/hooks/use-player";
import { usePlaylist } from "../core/hooks/use-songs";
import { Card } from "../design-system/Card";

function Playlist() {
  const { id } = useParams();
  const player = usePlayer();
  const playlistInfo = usePlaylist(+id);

  function playPlaylist() {
    const songToPlay = playlistInfo.data.songs[0];

    if (songToPlay) {
      player.playSelectedSong(songToPlay, playlistInfo.data.songs);
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
      <SoundPlaylist songs={playlistInfo.data.songs} />
    </div>
  );
}

export { Playlist };
