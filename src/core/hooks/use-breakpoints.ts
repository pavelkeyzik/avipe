import { useMediaQuery } from "react-responsive";
import { theme } from "../../theme";

function useBreakpoints() {
  const isMd = useMediaQuery({
    query: `(min-width: ${theme.tokens.breakpoints.md})`,
  });

  return {
    isMd,
  };
}

export { useBreakpoints };
