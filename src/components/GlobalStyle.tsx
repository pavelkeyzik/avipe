import { css, Global } from "@emotion/react";
import { theme } from "../theme";

const globalStyles = css`
  html {
    font-size: 100%;
  }

  body {
    font-family: "Poppins", sans-serif;
    margin: 0;
    padding: 0;
    background: ${theme.body.background};
    color: ${theme.body.foreground};
  }

  * {
    box-sizing: border-box;
  }

  h2 {
    margin: 12px 0 8px;
  }

  p {
    margin: 4px 0;
  }
`;

function GlobalStyle() {
  return <Global styles={globalStyles} />;
}

export { GlobalStyle };
