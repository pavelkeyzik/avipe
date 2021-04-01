import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CurrentSong, usePlayer } from "../core/hooks/use-player";
import { SoundCard } from "../design-system/SoundCard";

type SoundPlaylistProps = {
  isLoading?: boolean;
  songs?: CurrentSong[];
};

const variants = {
  open: {
    transition: { staggerChildren: 0.04 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

function SoundPlaylist(props: SoundPlaylistProps) {
  const player = usePlayer();

  function handleOnClickSoundCard(selectedSongToPlay: CurrentSong) {
    if (props.songs) {
      player.playSelectedSong(selectedSongToPlay, props.songs);
    }
  }

  if (props.isLoading) {
    return <Fallback />;
  }

  if (!props.songs) {
    return <div>No Songs...</div>;
  }

  return (
    <SoundsGridList variants={variants} initial="closed" animate="open">
      {props.songs.map((song: any) => {
        return (
          <motion.div key={song.id} variants={itemVariants}>
            <SoundCard
              songData={song}
              onClick={handleOnClickSoundCard}
              isPlaying={
                player.currentSong ? player.currentSong.id === song.id : false
              }
            />
          </motion.div>
        );
      })}
    </SoundsGridList>
  );
}

const SoundsGridList = styled(motion.div)`
  display: grid;
  grid-gap: 20px;
`;

function Fallback() {
  return (
    <SoundsGridList>
      <SoundCard.Fallback />
      <SoundCard.Fallback />
      <SoundCard.Fallback />
      <SoundCard.Fallback />
      <SoundCard.Fallback />
    </SoundsGridList>
  );
}

export { SoundPlaylist };
