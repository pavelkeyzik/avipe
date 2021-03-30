import React, { createContext, useContext, useEffect, useState } from "react";
import { spotifyApi } from "../api";

const SpotifyAuthContext = createContext({
  isAuthorized: false,
  signIn: () => {},
});

function SpotifyAuthProvider(props: React.PropsWithChildren<any>) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (storedToken) {
      spotifyApi.setAccessToken(storedToken);
      setIsAuthorized(true);
    }
  }, []);

  function signIn() {
    setIsAuthorized(true);
  }

  return (
    <SpotifyAuthContext.Provider
      value={{
        isAuthorized,
        signIn,
      }}
    >
      {props.children}
    </SpotifyAuthContext.Provider>
  );
}

function useAuthState() {
  return useContext(SpotifyAuthContext);
}

export { SpotifyAuthProvider, useAuthState };
