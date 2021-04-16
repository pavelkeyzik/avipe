import "@emotion/react";
import { Theme as DefaultTheme } from "@avipe/design-system";

declare module "@emotion/react" {
  export interface Theme extends DefaultTheme {}
}
