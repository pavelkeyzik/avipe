import { css } from "@emotion/react";
import styled from "@emotion/styled";

type ButtonProps = {
  shape?: "pilled" | "square";
};

const Button = styled.button<ButtonProps>(
  ({ theme, shape }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 0 32px;
    background: ${theme.button.background};
    color: ${theme.button.foreground};
    border: none;
    min-height: 48px;
    font-family: inherit;
    cursor: pointer;

    ${shape === "square"
      ? css`
          border-radius: 8px;
        `
      : css`
          border-radius: 48px;
        `}

    :hover {
      background: ${theme.button.backgroundHover};
    }
  `
);

Button.defaultProps = {
  shape: "pilled",
};

export { Button };
