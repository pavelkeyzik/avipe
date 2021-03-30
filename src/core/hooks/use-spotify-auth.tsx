import React, { createContext, useContext, useState } from "react";

const SpotifyAuthContext = createContext({
  isAuthorized: false,
  signIn: () => {},
  signOut: () => {},
});

function SpotifyAuthProvider(props: React.PropsWithChildren<any>) {
  const [isAuthorized, setIsAuthorized] = useState(
    localStorage.getItem("access_token") ? true : false
  );

  function signIn() {
    setIsAuthorized(true);
  }

  function signOut() {
    setIsAuthorized(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  return (
    <SpotifyAuthContext.Provider
      value={{
        isAuthorized,
        signIn,
        signOut,
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
