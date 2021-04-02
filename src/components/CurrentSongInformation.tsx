import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  getFormattedTimeFromSeconds,
  usePlayer,
} from "../core/hooks/use-player";
import { PauseIcon } from "./icons/Pause";
import { PlayIcon } from "./icons/Play";
import { SkipBackIcon } from "./icons/SkipBack";
import { SkipForwardIcon } from "./icons/SkipForward";
import { SoundSlider } from "./SoundSlider";

function CurrentSongInformation() {
  const player = usePlayer();
  const variants = {
    hidden: { opacity: 0, bottom: "-100px" },
    visible: { opacity: 1, bottom: 0 },
  };

  if (!player.currentSong) {
    return null;
  }

  return (
    <Footer initial="hidden" animate="visible" variants={variants}>
      <SoundInfoRoot>
        <SoundImageContainer>
          <img src={player.currentSong.cover_image} alt="Sound Cover" />
        </SoundImageContainer>
        <SoundInfo>
          <SoundInfoSongName>{player.currentSong.name}</SoundInfoSongName>
          <SoundInfoTitle>{player.currentSong.artist}</SoundInfoTitle>
        </SoundInfo>
      </SoundInfoRoot>
      <SongProgress>
        <SongProgressTime right>
          {getFormattedTimeFromSeconds(player.currentTime)}
        </SongProgressTime>
        <SoundSlider
          value={player.currentTime ?? 0}
          max={player.duration ?? 100}
          onRelease={player.seek}
        />
        <SongProgressTime>
          {getFormattedTimeFromSeconds(player.duration)}
        </SongProgressTime>
      </SongProgress>
      <PlayerControls>
        <IconButton onClick={player.prev}>
          <SkipBackIcon />
        </IconButton>
        {player.status === "playing" ? (
          <PlayButton onClick={player.pause}>
            <PauseIcon />
          </PlayButton>
        ) : (
          <PlayButton onClick={player.resume}>
            <PlayIcon />
          </PlayButton>
        )}
        <IconButton onClick={player.next}>
          <SkipForwardIcon />
        </IconButton>
      </PlayerControls>
    </Footer>
  );
}

const Footer = styled(motion.div)(
  ({ theme }) => css`
    position: fixed;
    z-index: ${theme.layerManager.player};
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: #2d2d35;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px 0 20px;
  `
);

const SoundImageContainer = styled.div(
  ({ theme }) => css`
    width: 60px;
    height: 60px;
    border-radius: 8px;
    background: ${theme.avatar.background};
    overflow: hidden;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `
);

const SoundInfoRoot = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
`;

const SoundInfo = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
`;

const SoundInfoSongName = styled.h4`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SoundInfoTitle = styled.span`
  color: rgba(255, 255, 255, 0.5);
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PlayerControls = styled.div`
  display: flex;
  flex: 1;
  flex-shrink: 0;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-family: inherit;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
  color: white;
`;

const SongProgress = styled.div`
  display: flex;
  flex: 6;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  padding: 0 64px;
`;

const SongProgressTime = styled.div<{ right?: boolean }>`
  width: 90px;
  display: flex;

  ${(props) =>
    props.right &&
    css`
      justify-content: flex-end;
    `}
`;

export { CurrentSongInformation };
