import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Typography,
  SkipBackIcon,
  SkipForwardIcon,
  PauseIcon,
  PlayIcon,
  ChevronDown,
} from "@avipe/design-system";
import { getFormattedTimeFromSeconds, usePlayer } from "@avipe/core";
import { SoundSlider } from "../../SoundSlider";

type SongInfoFullscreenProps = {
  visible?: boolean;
  onClose?: () => void;
};

function SongInfoFullscreen(props: SongInfoFullscreenProps) {
  const player = usePlayer();

  if (!props.visible) {
    return null;
  }

  return (
    <Root>
      <BackgroundImageContainer>
        <img src={player.currentSong?.cover_image} alt="background" />
      </BackgroundImageContainer>
      <Content>
        <CloseIconContainer onClick={props.onClose}>
          <ChevronDown />
          <Typography.H3>Now Playing</Typography.H3>
          <div />
        </CloseIconContainer>
        <ContentCenter>
          <SongCover>
            <img src={player.currentSong?.cover_image} alt="cover" />
          </SongCover>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Typography.H3 style={{ margin: 0 }}>
              {player.currentSong?.name ?? "Unknown"}
            </Typography.H3>
            <Typography.P>
              {player.currentSong?.artist ?? "Unknown"}
            </Typography.P>
          </div>
        </ContentCenter>
        <SoundSlider
          value={player.currentTime ?? 0}
          max={player.duration ?? 100}
          onRelease={player.seek}
        />
        <SpaceBetween>
          <SongProgressTime>
            {getFormattedTimeFromSeconds(player.currentTime)}
          </SongProgressTime>
          <SongProgressTime right>
            {getFormattedTimeFromSeconds(player.duration)}
          </SongProgressTime>
        </SpaceBetween>
        <Center>
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
        </Center>
      </Content>
    </Root>
  );
}

const Root = styled.div(
  ({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${window.innerHeight}px;
    z-index: ${theme.layerManager.modals};
    background: ${theme.body.background};
  `
);

const BackgroundImageContainer = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(40px) brightness(0.5);
  }
`;

const Content = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: calc(${theme.layerManager.modals}px + 1);
    padding: ${theme.tokens.spacing[3]} ${theme.tokens.spacing[3]};
    height: ${window.innerHeight}px;
  `
);

const SongCover = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
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

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
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

const ContentCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const CloseIconContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    transform: translateX(-${theme.tokens.spacing[3]});
    padding-left: ${theme.tokens.spacing[3]};
    cursor: pointer;
  `
);

export { SongInfoFullscreen };
