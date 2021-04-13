import React from 'react';
import { css, Global } from '@emotion/react';
import { theme } from './theme';

const globalStyles = css`
  html {
    font-size: 100%;
  }

  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: ${theme.body.background};
    color: ${theme.body.foreground};
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${theme.link.foreground};

    :hover {
      color: ${theme.link.foregroundHover};
    }
  }

  img {
    vertical-align: middle;
  }
`;

function GlobalStyle() {
  return <Global styles={globalStyles} />;
}

export { GlobalStyle };
