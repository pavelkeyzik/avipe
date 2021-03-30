import React, { createContext, useContext, useRef, useState } from "react";
import { api } from "../api";

type ContextType = {
  currentSong: number | null;
  setCurrentSong: (param: number | null) => void;
};

const PlayerContext = createContext<ContextType>({
  currentSong: null,
  setCurrentSong: () => {},
});

function PlayerProvider(props: React.PropsWithChildren<any>) {
  const [currentSong, setCurrentSong] = useState<number | null>(null);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
}

function usePlayer() {
  const context = useContext(PlayerContext);
  const audioRef = useRef<any>();

  function play(id: number) {
    context.setCurrentSong(id);
    audioRef.current.src = api.getSongURL(id);
    audioRef.current.play();
  }

  function stop() {
    context.setCurrentSong(null);
    audioRef.current.src = "";
  }

  return {
    audioRef,
    currentSongId: context.currentSong,
    play,
    stop,
  };
}

export { usePlayer, PlayerProvider };
