import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { usePlayer } from "../core/hooks/use-player";
import { PauseIcon } from "./icons/Pause";
import { PlayIcon } from "./icons/Play";
import { SkipBackIcon } from "./icons/SkipBack";
import { SkipForwardIcon } from "./icons/SkipForward";

function CurrentSongInformation() {
  const player = usePlayer();

  if (!player.currentSong) {
    return null;
  }

  return (
    <Footer>
      <SoundInfoRoot>
        <SoundImageContainer>
          <img src={player.currentSong.cover_image} alt="Sound Cover" />
        </SoundImageContainer>
        <SoundInfo>
          <SoundInfoSongName>{player.currentSong.name}</SoundInfoSongName>
          <SoundInfoTitle>{player.currentSong.artist}</SoundInfoTitle>
        </SoundInfo>
      </SoundInfoRoot>
      <PlayerControls>
        <div>
          {player.currentTime}-{player.duration}
        </div>
        <SkipBackIcon />
        <PlayButton>
          {player.status === "playing" ? (
            <PauseIcon onClick={player.pause} />
          ) : (
            <PlayIcon onClick={player.play} />
          )}
        </PlayButton>
        <SkipForwardIcon />
      </PlayerControls>
    </Footer>
  );
}

const Footer = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / 3;
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

export { CurrentSongInformation };
