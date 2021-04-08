import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CurrentSongInformation } from "./CurrentSongInformation";
import { Navigation } from "./Navigation";
import { Header } from "./Header";

function AuthorizedLayout(props: React.PropsWithChildren<any>) {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0 });
    }
  }, [mainContentRef, pathname]);

  return (
    <LayoutGrid>
      <Navigation />
      <Header />
      <Main ref={mainContentRef}>{props.children}</Main>
      <CurrentSongInformation />
    </LayoutGrid>
  );
}

const LayoutGrid = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 120px 1fr;
    height: 100vh;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      grid-template-columns: 2fr 10fr;
      grid-template-rows: 80px 1fr;
    }
  `
);

const Main = styled.div(
  ({ theme }) => css`
    grid-row: 1 / 3;
    grid-column: 1 / 3;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      grid-column: 2 / 3;
    }
  `
);

export { AuthorizedLayout };
