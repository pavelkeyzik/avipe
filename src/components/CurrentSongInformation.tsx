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
        <SongProgressTime style={{ justifyContent: "flex-end" }}>
          {getFormattedTimeFromSeconds(player.currentTime)}
        </SongProgressTime>
        <ProgressBar max={player.duration} value={player.currentTime} />
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

const Footer = styled(motion.div)`
  position: fixed;
  z-index: 16;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #2d2d35;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px 0 20px;
`;

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
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
`;

const SoundInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SoundInfoSongName = styled.h4`
  margin: 0;
`;

const SoundInfoTitle = styled.span`
  color: rgba(255, 255, 255, 0.5);
`;

const PlayerControls = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 24px;
  justify-content: center;
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
  background: white;
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
  gap: 20px;
  width: 100%;
  align-items: center;
  padding: 0 64px;
`;

const SongProgressTime = styled.div`
  width: 90px;
  display: flex;
`;

type ProgressBarProps = {
  max?: number | null;
  value?: number | null;
};

function ProgressBar(props: ProgressBarProps) {
  const maxValue = props.max ?? 100;
  const value = props.value ?? 0;
  const progress = Math.ceil((value * 100) / maxValue);

  return (
    <ProgressBarRoot>
      <ProgressBarFilled style={{ width: `${progress}%` }} />
    </ProgressBarRoot>
  );
}

const ProgressBarRoot = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  height: 4px;
  border-radius: 4px;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
`;

const ProgressBarFilled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: white;
`;

export { CurrentSongInformation };
