import { useBreakpoints } from "../../../core/hooks/use-breakpoints";

import { CurrentSongInformationDesktop } from "./CurrentSongInformationDesktop";
import { CurrentSongInformationMobile } from "./CurrentSongInformationMobile";

function CurrentSongInformation() {
  const breakpoints = useBreakpoints();

  if (breakpoints.isMd) {
    return <CurrentSongInformationDesktop />;
  }

  return <CurrentSongInformationMobile />;
}

export { CurrentSongInformation };
