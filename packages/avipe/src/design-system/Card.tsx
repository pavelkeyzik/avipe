import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Button } from "@avipe/design-system";
import React from "react";
import { PlayCircleIcon } from "../components/icons/PlayCircle";

function Card(props: React.PropsWithChildren<any>) {
  return <CardRoot {...props} />;
}

const CardRoot = styled(motion.div)(
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

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
`;

type PlayButtonProps = {
  onClick?: () => void;
};

function PlayButton(props: PlayButtonProps) {
  return (
    <PlayButtonRoot onClick={props.onClick}>
      <span>Play Now</span>
      <PlayCircleIcon />
    </PlayButtonRoot>
  );
}

const PlayButtonRoot = styled(Button)`
  margin-top: 8px;

  & > *:not(:last-child) {
    margin-right: 6px;
  }
`;

function CardFallback() {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ loop: Infinity, duration: 1 }}
    >
      <CardRootFallback />
    </motion.div>
  );
}

const CardRootFallback = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  height: 200px;
  border-radius: 8px;
`;

Card.PlayButton = PlayButton;
Card.Content = CardContent;
Card.Fallback = CardFallback;

export { Card };
