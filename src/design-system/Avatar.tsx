import { css } from "@emotion/react";
import styled from "@emotion/styled";

type AvatarProps = {
  variant: "small" | "large";
};

function Avatar(props: React.PropsWithChildren<AvatarProps>) {
  return <Root {...props} />;
}

const Root = styled.div<AvatarProps>(
  ({ theme, variant }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #777;
    border-radius: 50%;
    background: ${theme.avatar.background};
    overflow: hidden;

    ${variant === "large"
      ? css`
          width: 128px;
          height: 128px;
        `
      : css`
          width: 48px;
          height: 48px;
        `}

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `
);

Avatar.defaultProps = {
  variant: "small",
};

export { Avatar };
