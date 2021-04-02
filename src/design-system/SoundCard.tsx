import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { VolumeIcon } from "../components/icons/Volume";
import {
  CurrentSong,
  getFormattedTimeFromSeconds,
} from "../core/hooks/use-player";

type SoundCardProps = {
  songData: CurrentSong;
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
          <img src={props.songData.cover_image} alt="Sound Cover" />
        </ImageContainer>
        <CardTitle isPlaying={props.isPlaying}>
          <b>{props.songData.name || "Unknown"}</b>
          <span>{props.songData.artist || "Unknown"}</span>
        </CardTitle>
      </Left>
      {props.songData.duration ? (
        <Time>{getFormattedTimeFromSeconds(props.songData.duration)} min</Time>
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
    transition: 0.2s;

    :hover {
      color: ${theme.soundCard.textForegroundHover};
      box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.08);
    }
  `
);

const RootFallback = styled(Root)`
  cursor: default;
  color: unset;
  background: rgba(255, 255, 255, 0.03);

  :hover {
    color: unset;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CardTitle = styled.h3<{ isPlaying?: boolean }>(
  ({ theme, isPlaying }) => css`
    display: flex;
    flex-direction: column;
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

const ImageContainerFallback = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.04);
`;

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

function SoundCardFallback() {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ loop: Infinity, duration: 1 }}
    >
      <RootFallback>
        <ImageContainerFallback />
      </RootFallback>
    </motion.div>
  );
}

SoundCard.Fallback = SoundCardFallback;

export { SoundCard };
