import React, { createContext, useContext, useRef, useState } from "react";
import { api } from "../api";

type ContextType = {
  audioRef: React.MutableRefObject<any> | null;
  currentSong: number | null;
  setCurrentSong: (param: number | null) => void;
  play: (id: number) => void;
  stop: () => void;
};

const PlayerContext = createContext<ContextType>({
  audioRef: null,
  currentSong: null,
  setCurrentSong: () => {},
  play: () => {},
  stop: () => {},
});

function PlayerProvider(props: React.PropsWithChildren<any>) {
  const audioRef = useRef<any>(new Audio());
  const [currentSong, setCurrentSong] = useState<number | null>(null);

  function play(id: number) {
    setCurrentSong(id);

    if (audioRef) {
      audioRef.current.src = api.getSongURL(id);
      audioRef.current.play();
    }
  }

  function stop() {
    setCurrentSong(null);

    if (audioRef) {
      audioRef.current.src = "";
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentSong,
        setCurrentSong,
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

export { usePlayer, PlayerProvider };
