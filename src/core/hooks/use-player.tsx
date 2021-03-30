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

type SongStatus = "idle" | "playing" | "paused" | "stopped";

type ContextType = {
  currentSong: CurrentSong | null;
  currentTime: string | null;
  duration: string | null;
  status: SongStatus;
  setCurrentSong: (param: CurrentSong | null) => void;
  playSelectedSong: (param: CurrentSong | null) => void;
  play: () => void;
  resume: () => void;
  stop: () => void;
  pause: () => void;
};

const PlayerContext = createContext<ContextType>({
  currentSong: null,
  currentTime: null,
  duration: null,
  status: "idle",
  setCurrentSong: () => {},
  playSelectedSong: () => {},
  play: () => {},
  resume: () => {},
  stop: () => {},
  pause: () => {},
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
  const [status, setStatus] = useState<SongStatus>("idle");
  const [savedCurrentTime, setSavedCurrentTime] = useState(0);

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
      play();
    }

    // eslint-disable-next-line
  }, [currentSong]);

  function play() {
    if (currentSong) {
      audio.src = api.getSongURL(currentSong.id);
      audio.play();
      setStatus("playing");
    }
  }

  function stop() {
    setCurrentSong(null);
    setStatus("stopped");
    setSavedCurrentTime(0);
    audio.src = "";
  }

  function pause() {
    setStatus("paused");
    setSavedCurrentTime(audio.currentTime);
    audio.pause();
  }

  function resume() {
    if (status === "paused" && savedCurrentTime && savedCurrentTime !== 0) {
      audio.currentTime = savedCurrentTime;
      audio.play();
      setStatus("playing");
    }
  }

  function handleTimeUpdate(event: Event) {
    // @ts-expect-error Looks like path doesn't exists in typings
    const path = event.path || (event.composedPath && event.composedPath());
    const currentTime = path && path[0] && path[0].currentTime;

    if (currentTime !== undefined) {
      setCurrentTime(getFormattedTimeFromSeconds(currentTime));
    }
  }

  function playSelectedSong(selectedSong: CurrentSong | null) {
    setCurrentSong(selectedSong);
  }

  return (
    <PlayerContext.Provider
      value={{
        status,
        currentSong,
        setCurrentSong,
        playSelectedSong,
        currentTime,
        duration,
        play,
        resume,
        pause,
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
