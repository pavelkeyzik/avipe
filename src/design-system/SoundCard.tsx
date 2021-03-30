import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { VolumeIcon } from "../components/icons/Volume";
import {
  CurrentSong,
  getFormattedTimeFromSeconds,
} from "../core/hooks/use-player";

type SoundCardProps = {
  songData: CurrentSong;
  coverURL?: string;
  title?: string;
  time?: number;
  isPlaying?: boolean;
  onClick?: (params: CurrentSong) => void;
};

function SoundCard(props: SoundCardProps) {
  function handleClick() {
    props.onClick && props.onClick(props.songData);
  }

  return (
    <Root onClick={handleClick}>
      <Left>
        <ImageContainer>
          {props.isPlaying ? (
            <PlayingStatus>
              <VolumeIcon />
            </PlayingStatus>
          ) : null}
          <img src={props.coverURL} alt="Sound Cover" />
        </ImageContainer>
        <CardTitle isPlaying={props.isPlaying}>
          {props.title || "Unknown"}
        </CardTitle>
      </Left>
      {props.time ? (
        <Time>{getFormattedTimeFromSeconds(props.time)} min</Time>
      ) : null}
    </Root>
  );
}

const Root = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    cursor: pointer;
    color: ${theme.soundCard.textForeground};

    :hover {
      color: ${theme.soundCard.textForegroundHover};
    }
  `
);

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CardTitle = styled.h3<{ isPlaying?: boolean }>(
  ({ theme, isPlaying }) => css`
    margin: 0;

    ${isPlaying &&
    css`
      color: ${theme.soundCard.textForegroundHover};
    `}
  `
);

const ImageContainer = styled.div(
  ({ theme }) => css`
    width: 80px;
    height: 80px;
    border-radius: 8px;
    background: ${theme.soundCard.imageBackground};
    overflow: hidden;
    position: relative;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `
);

const Time = styled.span(
  ({ theme }) => css`
    color: ${theme.soundCard.timeForeground};
  `
);

const PlayingStatus = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  color: white;
`;

export { SoundCard };
