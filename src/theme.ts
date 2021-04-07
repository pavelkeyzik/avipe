const tokens = {
  colors: {
    primary: "#43d17c",
    white: "#fff",
  },
  spacing: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "16px",
    4: "24px",
    5: "32px",
    6: "40px",
  },
  breakpoints: {
    sm: "544px",
    md: "720px",
    lg: "1012px",
    xl: "1280px",
  },
};

const theme = {
  tokens,
  body: {
    background: "#16161f",
    foreground: "#fdfdfe",
  },
  contentPadding: "40px",
  avatar: {
    background: "#0f0f16",
  },
  card: {
    background: "#746db6",
    foreground: tokens.colors.white,
  },
  soundCard: {
    backgroundHover: "rgba(255, 255, 255, 0.1)",
    imageBackground: "#0f0f16",
    timeForeground: "rgba(255, 255, 255, 0.5)",
    textForeground: tokens.colors.white,
    textForegroundHover: tokens.colors.primary,
    textForegroundWhenPlaying: tokens.colors.primary,
  },
  button: {
    background: "#fff",
    backgroundHover: "#f2f2f2",
    foreground: "#403c65",
  },
  input: {
    border: "#5c5c63",
    borderFocus: tokens.colors.white,
    foreground: tokens.colors.white,
  },
  layerManager: {
    modals: 11,
    player: 10,
    leftNavigation: 9,
    topNavigation: 8,
  },
  link: {
    foreground: tokens.colors.white,
    foregroundHover: tokens.colors.primary,
  },
};

type Theme = typeof theme;

export type { Theme };
export { theme };
