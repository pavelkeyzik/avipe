import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Button = styled.button(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 32px;
    background: ${theme.button.background};
    color: ${theme.button.foreground};
    border: none;
    border-radius: 60px;
    min-height: 48px;
    font-family: inherit;
    cursor: pointer;

    :hover {
      background: ${theme.button.backgroundHover};
    }
  `
);

export { Button };
