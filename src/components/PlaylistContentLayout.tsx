import { css } from "@emotion/react";
import styled from "@emotion/styled";

const PlaylistContentLayout = styled.div(
  ({ theme }) => css`
    padding: ${theme.tokens.spacing[2]} ${theme.tokens.spacing[3]} 40px;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      padding: 40px ${theme.tokens.spacing[6]} 140px;
    }
  `
);

export { PlaylistContentLayout };
