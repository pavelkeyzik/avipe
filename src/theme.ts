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
    background: "#403c65",
    backgroundHover: "#201e32",
    foreground: "#fdfdfe",
  },
};

type Theme = typeof theme;

export type { Theme };
export { theme };
