import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Typography } from "@avipe/design-system";
import { CurrentSong, getFormattedTimeFromSeconds } from "@avipe/core";
import { motion } from "framer-motion";
import { Volume2Icon } from "../components/icons/Volume2";

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
      <ImageContainer>
        {props.isPlaying ? (
          <PlayingStatus>
            <Volume2Icon />
          </PlayingStatus>
        ) : null}
        <img src={props.songData.cover_image} alt="Sound Cover" />
      </ImageContainer>
      <CardTitle isPlaying={props.isPlaying}>
        <b>{props.songData.name || "Unknown"}</b>
        <span>{props.songData.artist || "Unknown"}</span>
      </CardTitle>
      <Time>
        {props.songData.duration
          ? getFormattedTimeFromSeconds(props.songData.duration)
          : null}
      </Time>
    </Root>
  );
}

const Root = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    color: ${theme.soundCard.textForeground};
    transition: 0.2s;

    & > *:not(:last-child) {
      margin-right: 20px;
    }

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

const CardTitle = styled(Typography.H3)<{ isPlaying?: boolean }>(
  ({ theme, isPlaying }) => css`
    display: flex;
    flex-direction: column;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
    margin: 0;

    & > * {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ${isPlaying &&
    css`
      color: ${theme.soundCard.textForegroundWhenPlaying};
    `}

    @media (max-width: ${theme.tokens.breakpoints.md}) {
      font-size: 0.9em;
    }
  `
);

const ImageContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: ${theme.soundCard.imageBackground};
    overflow: hidden;
    position: relative;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      width: 80px;
      height: 80px;
    }
  `
);

const ImageContainerFallback = styled(ImageContainer)(
  ({ theme }) => css`
    background: ${theme.soundCard.imageBackground};
  `
);

const Time = styled.span(
  ({ theme }) => css`
    display: flex;
    flex-shrink: 0;
    justify-content: flex-end;
    width: 80px;
    color: ${theme.soundCard.timeForeground};

    @media (max-width: ${theme.tokens.breakpoints.md}) {
      font-size: 0.8em;
    }
  `
);

const PlayingStatus = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${theme.soundCard.playngStatusBackground};
    color: ${theme.soundCard.playngStatusForeground};
  `
);

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
