const theme = {
  contentPadding: "40px",
  avatar: {
    background: "#192324",
  },
  card: {
    background: "#F7F3F0",
    foreground: "#253334",
  },
  soundCard: {
    backgroundHover: "rgba(255, 255, 255, 0.1)",
    imageBackground: "#192324",
    timeForeground: "rgba(255, 255, 255, 0.5)",
    textForeground: "rgba(255, 255, 255, 0.75)",
    textForegroundHover: "#ffffff",
  },
  button: {
    background: "#253334",
    backgroundHover: "#1C2222",
    foreground: "#fff",
  },
};

type Theme = typeof theme;

export type { Theme };
export { theme };
