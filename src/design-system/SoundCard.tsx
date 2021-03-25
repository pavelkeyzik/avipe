import { css } from "@emotion/react";
import styled from "@emotion/styled";

type SoundCardProps = {
  coverURL?: string;
  title?: string;
  time?: number;
};

function SoundCard(props: SoundCardProps) {
  return (
    <Root>
      <Left>
        <ImageContainer>
          <img src={props.coverURL} alt="Sound Cover" />
        </ImageContainer>
        <CardTitle>{props.title || "Unknown"}</CardTitle>
      </Left>
      {props.time ? <Time>{props.time} min</Time> : null}
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

const CardTitle = styled.h3`
  margin: 0;
`;

const ImageContainer = styled.div(
  ({ theme }) => css`
    width: 80px;
    height: 80px;
    border-radius: 8px;
    background: ${theme.soundCard.imageBackground};
    overflow: hidden;

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

export { SoundCard };
