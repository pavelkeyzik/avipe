import { css } from "@emotion/react";
import styled from "@emotion/styled";

const H1 = styled.h1(
  ({ theme }) => css`
    margin: ${theme.tokens.spacing[4]} 0 ${theme.tokens.spacing[3]};
    font-size: 1.8em;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      font-size: 2em;
    }
  `
);

const H2 = styled.h2(
  ({ theme }) => css`
    margin: ${theme.tokens.spacing[3]} 0 ${theme.tokens.spacing[2]};
  `
);

const H3 = styled.h3(
  ({ theme }) => css`
    margin: ${theme.tokens.spacing[2]} 0 ${theme.tokens.spacing[1]};
    font-weight: 300;
  `
);

const P = styled.p(
  ({ theme }) => css`
    margin: ${theme.tokens.spacing[2]} 0;
    font-size: 0.9rem;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      font-size: 1rem;
    }
  `
);

const Typography = {
  H1,
  H2,
  H3,
  P,
};

export { Typography };
