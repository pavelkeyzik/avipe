import React, { createContext, useContext, useRef, useState } from "react";
import { api } from "../api";

type CurrentSong = {
  id: number;
  name: string;
  artist: string;
};

type ContextType = {
  audioRef: React.MutableRefObject<any> | null;
  currentSong: CurrentSong | null;
  setCurrentSong: (param: CurrentSong | null) => void;
  play: (id: CurrentSong) => void;
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
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);

  function play(songToPlay: CurrentSong) {
    setCurrentSong(songToPlay);

    if (audioRef) {
      audioRef.current.src = api.getSongURL(songToPlay.id);
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

export type { CurrentSong };
export { usePlayer, PlayerProvider };
