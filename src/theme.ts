const theme = {
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
    foreground: "white",
  },
  soundCard: {
    backgroundHover: "rgba(255, 255, 255, 0.1)",
    imageBackground: "#0f0f16",
    timeForeground: "rgba(255, 255, 255, 0.5)",
    textForeground: "white",
    textForegroundHover: "#a792fd",
  },
  button: {
    background: "#fdfdfe",
    backgroundHover: "#edebff",
    foreground: "#403c65",
  },
  input: {
    border: "#5c5c63",
    borderFocus: "#ffffff",
    foreground: "#ffffff",
  },
  layerManager: {
    modals: 11,
    player: 10,
    leftNavigation: 9,
    topNavigation: 8,
  },
};

type Theme = typeof theme;

export type { Theme };
export { theme };
