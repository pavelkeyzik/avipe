import { css } from "@emotion/react";
import styled from "@emotion/styled";

type ButtonProps = {
  variant?: "filled" | "outlined";
  shape?: "pilled" | "square";
};

const Button = styled.button<ButtonProps>(
  ({ theme, shape, variant }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 0 32px;
    border: none;
    min-height: 48px;
    font-family: inherit;
    cursor: pointer;

    ${variant === "outlined"
      ? css`
          background: none;
          border: 2px solid ${theme.button.background};
          color: ${theme.button.background};

          :hover {
            border-color: ${theme.button.backgroundHover};
            color: ${theme.button.backgroundHover};
          }
        `
      : css`
          background: ${theme.button.background};
          color: ${theme.button.foreground};

          :hover {
            background: ${theme.button.backgroundHover};
          }
        `}

    ${shape === "square"
      ? css`
          border-radius: 8px;
        `
      : css`
          border-radius: 48px;
        `}
  `
);

Button.defaultProps = {
  shape: "pilled",
  variant: "filled",
};

export { Button };
