import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { getFormattedTimeFromSeconds, usePlayer } from "@avipe/core";
import { PauseIcon } from "../../icons/Pause";
import { PlayIcon } from "../../icons/Play";
import { SkipBackIcon } from "../../icons/SkipBack";
import { SkipForwardIcon } from "../../icons/SkipForward";
import { Volume1Icon } from "../../icons/Volume1";
import { Volume2Icon } from "../../icons/Volume2";
import { VolumeXIcon } from "../../icons/VolumeX";
import { SoundSlider } from "../../SoundSlider";

function CurrentSongInformationDesktop() {
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
          <SoundInfoSongName>
            {player.currentSong.name ?? "Unknown"}
          </SoundInfoSongName>
          <SoundInfoTitle>
            {player.currentSong.artist ?? "Unknown"}
          </SoundInfoTitle>
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
        <VolumeContainer>
          {player.currentVolume === 0 ? (
            <VolumeXIcon />
          ) : player.currentVolume && player.currentVolume >= 50 ? (
            <Volume2Icon />
          ) : (
            <Volume1Icon />
          )}
          <SoundSlider
            value={player.currentVolume ?? 0}
            max={100}
            onChange={player.changeVolume}
            onRelease={player.saveVolume}
          />
        </VolumeContainer>
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
    background: #2d2d35;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px 0 20px;
    height: 100px;
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
  flex-shrink: 0;

  & > *:not(:last-child) {
    margin-right: 20px;
  }
`;

const SoundInfo = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  max-width: 140px;
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
  justify-content: flex-end;
  align-items: center;

  & > *:not(:first-of-type) {
    margin-left: 12px;
  }
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

const SongProgress = styled.div(
  ({ theme }) => css`
    display: none;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      display: flex;
      flex: 6;
      width: 100%;
      max-width: 1200px;
      align-items: center;
      padding: 0 64px;

      & > *:not(:last-child) {
        margin-right: 20px;
      }
    }
  `
);

const SongProgressTime = styled.div<{ right?: boolean }>`
  width: 90px;
  display: flex;

  ${(props) =>
    props.right &&
    css`
      justify-content: flex-end;
    `}
`;

const VolumeContainer = styled.div(
  ({ theme }) => css`
    display: none;

    @media (min-width: ${theme.tokens.breakpoints.lg}) {
      display: flex;
      align-items: center;
      width: 200px;

      & > *:not(:last-child) {
        margin-right: 8px;
      }
    }
  `
);

export { CurrentSongInformationDesktop };
