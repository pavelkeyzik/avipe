import { css } from "@emotion/react";
import styled from "@emotion/styled";

function Avatar(props: React.PropsWithChildren<any>) {
  return <Root>{props.children}</Root>;
}

const Root = styled.div(
  ({ theme }) => css`
    width: 60px;
    height: 60px;
    border-radius: 8px;
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
