import React, { createContext, useContext, useEffect, useState } from "react";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { api } from "../api";

momentDurationFormatSetup(moment);

type CurrentSong = {
  id: number;
  name: string;
  artist: string;
  duration: number;
  cover_image: string;
};

type ContextType = {
  currentSong: CurrentSong | null;
  currentTime: string | null;
  duration: string | null;
  setCurrentSong: (param: CurrentSong | null) => void;
  play: (id: CurrentSong) => void;
  stop: () => void;
};

const PlayerContext = createContext<ContextType>({
  currentSong: null,
  currentTime: null,
  duration: null,
  setCurrentSong: () => {},
  play: () => {},
  stop: () => {},
});

function getFormattedTimeFromSeconds(seconds: number, trim?: boolean) {
  const duration = moment.duration(Math.floor(seconds), "seconds");
  const formattedCurrentTime = duration.format("mm:ss", {
    trim: trim ? undefined : false,
  });

  return formattedCurrentTime;
}

function PlayerProvider(props: React.PropsWithChildren<any>) {
  const audio = React.useMemo(() => new Audio(), []);
  const [duration, setDuration] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);

  useEffect(() => {
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);

  useEffect(() => {
    if (currentSong) {
      setDuration(getFormattedTimeFromSeconds(currentSong.duration));
      setCurrentTime(getFormattedTimeFromSeconds(0));
    }
  }, [currentSong]);

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
      setCurrentTime(getFormattedTimeFromSeconds(currentTime));
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentTime,
        duration,
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
export { usePlayer, PlayerProvider, getFormattedTimeFromSeconds };
