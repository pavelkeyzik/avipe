import { css } from "@emotion/react";
import styled from "@emotion/styled";

function Avatar(props: React.PropsWithChildren<any>) {
  return <Root>{props.children}</Root>;
}

const Root = styled.div(
  ({ theme }) => css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${theme.avatar.background};
    overflow: hidden;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `
);

export { Avatar };
