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
    background: "#efebfd",
    foreground: "#16161f",
  },
  soundCard: {
    backgroundHover: "rgba(255, 255, 255, 0.1)",
    imageBackground: "#0f0f16",
    timeForeground: "rgba(255, 255, 255, 0.5)",
    textForeground: "white",
    textForegroundHover: "#a792fd",
  },
  button: {
    background: "#16161f",
    backgroundHover: "#433a65",
    foreground: "#fdfdfe",
  },
};

type Theme = typeof theme;

export type { Theme };
export { theme };
