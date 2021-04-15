import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { useModal, usePlayer } from "@avipe/core";
import { PauseIcon, PlayIcon } from "@avipe/design-system";
import { SongInfoFullscreen } from "./SongInfoFullscreen";

function withStopPropagation(callback: () => void) {
  return function removePropagation(event: any) {
    event.stopPropagation();
    callback();
  };
}

function CurrentSongInformationMobile() {
  const songInfoModal = useModal();
  const player = usePlayer();
  const variants = {
    hidden: { opacity: 0, bottom: "-100px" },
    visible: { opacity: 1, bottom: 60 },
  };
  const pauseWithStopPropagation = withStopPropagation(player.pause);
  const resumeWithStopPropagation = withStopPropagation(player.resume);

  if (!player.currentSong) {
    return null;
  }

  return (
    <React.Fragment>
      <Footer
        onClick={songInfoModal.open}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
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
        <PlayerControls>
          {player.status === "playing" ? (
            <PlayButton onClick={pauseWithStopPropagation}>
              <PauseIcon />
            </PlayButton>
          ) : (
            <PlayButton onClick={resumeWithStopPropagation}>
              <PlayIcon />
            </PlayButton>
          )}
        </PlayerControls>
      </Footer>
      <SongInfoFullscreen
        visible={songInfoModal.visible}
        onClose={songInfoModal.close}
      />
    </React.Fragment>
  );
}

const Footer = styled(motion.div)(
  ({ theme }) => css`
    position: fixed;
    bottom: 60px;
    left: 0;
    width: 100%;
    z-index: calc(${theme.layerManager.navigation} + 1);
    background: #2d2d35;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 70px;
  `
);

const SoundImageContainer = styled.div(
  ({ theme }) => css`
    width: 40px;
    height: 40px;
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
  width: 40px;
  height: 40px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
`;

export { CurrentSongInformationMobile };
