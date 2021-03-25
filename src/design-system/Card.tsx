import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { PlayCircleIcon } from "../components/icons/PlayCircle";
import { Button } from "../design-system/Button";

function Card(props: React.PropsWithChildren<any>) {
  return <CardRoot>{props.children}</CardRoot>;
}

const CardRoot = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 8px;
    background: ${theme.card.background};
    color: ${theme.card.foreground};
    padding: 16px;
  `
);

type PlayButtonProps = {
  onClick?: () => void;
};

function PlayButton(props: PlayButtonProps) {
  return (
    <PlayButtonRoot onClick={props.onClick}>
      Play Now <PlayCircleIcon />
    </PlayButtonRoot>
  );
}

const PlayButtonRoot = styled(Button)`
  margin-top: 8px;
`;

Card.PlayButton = PlayButton;

export { Card };
