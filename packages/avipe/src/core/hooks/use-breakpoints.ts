import { useMediaQuery } from "react-responsive";
import { theme } from "@avipe/design-system";

function useBreakpoints() {
  const isMd = useMediaQuery({
    query: `(min-width: ${theme.tokens.breakpoints.md})`,
  });

  return {
    isMd,
  };
}

export { useBreakpoints };
