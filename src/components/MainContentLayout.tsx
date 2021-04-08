import { css } from "@emotion/react";
import styled from "@emotion/styled";

const MainContentLayout = styled.div(
  ({ theme }) => css`
    padding: ${theme.tokens.spacing[4]} ${theme.tokens.spacing[3]} 40px;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      padding: 100px ${theme.tokens.spacing[6]} 40px;
    }
  `
);

export { MainContentLayout };
