import React, { createContext, useContext, useEffect, useState } from "react";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { api } from "../api";

momentDurationFormatSetup(moment);

type CurrentSong = {
  id: number;
  name: string;
  artist: string;
};

type ContextType = {
  currentSong: CurrentSong | null;
  currentTime: string | null;
  setCurrentSong: (param: CurrentSong | null) => void;
  play: (id: CurrentSong) => void;
  stop: () => void;
};

const PlayerContext = createContext<ContextType>({
  currentSong: null,
  currentTime: null,
  setCurrentSong: () => {},
  play: () => {},
  stop: () => {},
});

function PlayerProvider(props: React.PropsWithChildren<any>) {
  const audio = React.useMemo(() => new Audio(), []);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);

  useEffect(() => {
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);

  function play(songToPlay: CurrentSong) {
    setCurrentSong(songToPlay);
    audio.src = api.getSongURL(songToPlay.id);
    audio.play();
  }

  function stop() {
    setCurrentSong(null);
    audio.src = "";
  }

  function handleTimeUpdate(event: Event) {
    // @ts-expect-error Looks like path doesn't exists in typings
    const path = event.path || (event.composedPath && event.composedPath());
    const currentTime = path && path[0] && path[0].currentTime;

    if (currentTime !== undefined) {
      const duration = moment.duration(Math.floor(currentTime), "seconds");
      const formattedCurrentTime = duration.format("mm:ss", {
        trim: false,
      });

      setCurrentTime(formattedCurrentTime);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentTime,
        play,
        stop,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
}

function usePlayer() {
  return useContext(PlayerContext);
}

export type { CurrentSong };
export { usePlayer, PlayerProvider };
