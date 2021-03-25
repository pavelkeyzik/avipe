import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Card = styled.div(
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

export { Card };
