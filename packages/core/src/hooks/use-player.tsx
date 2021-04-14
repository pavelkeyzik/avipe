import React, { createContext, useContext, useEffect, useState } from "react";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

type CurrentSong = {
  id: number;
  name: string;
  artist: string;
  duration: number;
  cover_image: string;
  file: string;
};

type SongStatus = "idle" | "playing" | "paused" | "stopped";

type ContextType = {
  currentSong: CurrentSong | null;
  currentTime: number | null;
  currentVolume: number | null;
  duration: number | null;
  status: SongStatus;
  songsQueue: CurrentSong[];
  setCurrentSong: (param: CurrentSong | null) => void;
  playSelectedSong: (param: CurrentSong | null, queue: CurrentSong[]) => void;
  play: () => void;
  resume: () => void;
  stop: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  changeVolume: (time: number) => void;
  saveVolume: (time: number) => void;
};

const PlayerContext = createContext<ContextType>({
  currentSong: null,
  currentTime: null,
  currentVolume: null,
  duration: null,
  status: "idle",
  songsQueue: [],
  setCurrentSong: () => {},
  playSelectedSong: () => {},
  play: () => {},
  resume: () => {},
  stop: () => {},
  pause: () => {},
  next: () => {},
  prev: () => {},
  seek: () => {},
  changeVolume: () => {},
  saveVolume: () => {},
});

function getFormattedTimeFromSeconds(seconds?: number | null, trim?: boolean) {
  if (!seconds) {
    return "00:00";
  }

  const duration = moment.duration(Math.floor(seconds), "seconds");
  const formattedCurrentTime = duration.format("mm:ss", {
    trim: trim ? undefined : false,
  });

  return formattedCurrentTime;
}

function getPreferedVolume() {
  const savedVolume = localStorage.getItem("volume");

  if (savedVolume && +savedVolume && +savedVolume >= 0 && +savedVolume <= 100) {
    return +savedVolume / 100;
  }

  return null;
}

function setPreferedVolume(value: number) {
  localStorage.setItem("volume", String(value));
}

function PlayerProvider(props: React.PropsWithChildren<any>) {
  const audio = React.useMemo(() => new Audio(), []);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [currentVolume, setCurrentVolume] = useState<number | null>(null);
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);
  const [status, setStatus] = useState<SongStatus>("idle");
  const [savedCurrentTime, setSavedCurrentTime] = useState(0);
  const [songsQueue, setSongsQueue] = useState<CurrentSong[]>([]);

  useEffect(() => {
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("volumechange", handleVolumeUpdate);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("volumechange", handleVolumeUpdate);
    };
  }, [audio]);

  useEffect(() => {
    audio.addEventListener("ended", handleSongEnded);

    return () => {
      audio.removeEventListener("ended", handleSongEnded);
    };
  }, [audio, handleSongEnded]);

  useEffect(() => {
    if (currentSong) {
      setDuration(currentSong.duration);
      setCurrentTime(0);
      play();
    }

    // eslint-disable-next-line
  }, [currentSong]);

  function play() {
    if (currentSong) {
      const preferedVolume = getPreferedVolume();

      audio.src = currentSong.file;
      audio.volume = preferedVolume !== null ? preferedVolume : 0.5;
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
      setCurrentTime(currentTime);
    }
  }

  function handleVolumeUpdate(event: Event) {
    // @ts-expect-error Looks like path doesn't exists in typings
    const path = event.path || (event.composedPath && event.composedPath());
    const volume = path && path[0] && path[0].volume;

    if (volume !== undefined) {
      setCurrentVolume(Math.floor(volume * 100));
    }
  }

  // eslint-disable-next-line
  function handleSongEnded() {
    next();
  }

  function playSelectedSong(
    selectedSong: CurrentSong | null,
    queue: CurrentSong[]
  ) {
    if (!selectedSong) {
      return setCurrentSong(null);
    }

    setSongsQueue(queue);
    setCurrentSong(selectedSong);

    // Just for Safari
    audio.play();
  }

  function next() {
    if (!currentSong) {
      return;
    }

    const currentSongId = currentSong.id;
    const foundedSongIndex = songsQueue.findIndex(
      (i) => i.id === currentSongId
    );

    if (foundedSongIndex >= 0 && foundedSongIndex + 2 <= songsQueue.length) {
      setCurrentSong(songsQueue[foundedSongIndex + 1]);
    }
  }

  function prev() {
    if (!currentSong) {
      return;
    }

    const currentSongId = currentSong.id;
    const foundedSongIndex = songsQueue.findIndex(
      (i) => i.id === currentSongId
    );

    if (
      foundedSongIndex - 1 >= 0 &&
      foundedSongIndex + 1 <= songsQueue.length
    ) {
      setCurrentSong(songsQueue[foundedSongIndex - 1]);
    }
  }

  function seek(value: number) {
    if (!currentSong) {
      return;
    }

    audio.currentTime = value;
    setCurrentTime(value);
  }

  function changeVolume(value: number) {
    if (!currentSong) {
      return;
    }

    audio.volume = value / 100;
    setCurrentVolume(value);
  }

  function saveVolume(value: number) {
    setPreferedVolume(value);
  }

  return (
    <PlayerContext.Provider
      value={{
        status,
        currentSong,
        setCurrentSong,
        playSelectedSong,
        currentTime,
        currentVolume,
        duration,
        play,
        resume,
        pause,
        stop,
        songsQueue,
        next,
        prev,
        seek,
        changeVolume,
        saveVolume,
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
