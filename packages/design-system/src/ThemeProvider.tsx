import React from 'react';
import { ThemeProvider as ThemeProviderBase } from '@emotion/react';
import { theme } from './theme';
import { GlobalStyle } from './GlobalStyle';

function ThemeProvider(props: React.PropsWithChildren<unknown>) {
  return (
    <ThemeProviderBase theme={theme}>
      <GlobalStyle />
      {props.children}
    </ThemeProviderBase>
  );
}

export { ThemeProvider };
