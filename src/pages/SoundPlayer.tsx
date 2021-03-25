import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PlayIcon } from "../components/icons/Play";
import { SkipBackIcon } from "../components/icons/SkipBack";
import { SkipForwardIcon } from "../components/icons/SkipForward";

function SoundPlayer() {
  return (
    <Root>
      <SoundImageContainer>
        <img
          src="https://source.unsplash.com/user/pavelkeyzik/320x320"
          alt="Sound Cover"
        />
      </SoundImageContainer>
      <SoundInfo>
        <h2>Three Days Grace</h2>
        <p>I Hate Everything About You</p>
      </SoundInfo>
      <PlayerControls>
        <SkipBackIcon />
        <PlayButton>
          <PlayIcon />
        </PlayButton>
        <SkipForwardIcon />
      </PlayerControls>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const SoundImageContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
    margin: 0 auto;
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

const SoundInfo = styled.div`
  text-align: center;
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
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: white;
  cursor: pointer;
`;

export { SoundPlayer };
