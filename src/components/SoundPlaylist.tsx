import styled from "@emotion/styled";
import { CurrentSong, usePlayer } from "../core/hooks/use-player";
import { SoundCard } from "../design-system/SoundCard";

type SoundPlaylistProps = {
  songs?: CurrentSong[];
};

function SoundPlaylist(props: SoundPlaylistProps) {
  const player = usePlayer();

  function handleOnClickSoundCard(selectedSongToPlay: CurrentSong) {
    if (props.songs) {
      player.playSelectedSong(selectedSongToPlay, props.songs);
    }
  }

  if (!props.songs) {
    return <div>No Songs...</div>;
  }

  return (
    <SoundsGridList>
      {props.songs.map((song: any) => {
        return (
          <SoundCard
            key={song.id}
            songData={song}
            onClick={handleOnClickSoundCard}
            isPlaying={
              player.currentSong ? player.currentSong.id === song.id : false
            }
          />
        );
      })}
    </SoundsGridList>
  );
}

const SoundsGridList = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export { SoundPlaylist };
