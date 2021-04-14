import React, { createContext, useContext, useState } from "react";

const SpotifyAuthContext = createContext({
  isAuthorized: false,
  isAnonymously: false,
  signIn: () => {},
  signInAnonymously: () => {},
  signOut: () => {},
});

function AuthProvider(props: React.PropsWithChildren<any>) {
  const [isAnonymously, setIsAnonymously] = useState(
    localStorage.getItem("is_anonymously") ? true : false
  );
  const [isAuthorized, setIsAuthorized] = useState(
    isAnonymously || localStorage.getItem("access_token") ? true : false
  );

  function signIn() {
    setIsAuthorized(true);
  }

  function signInAnonymously() {
    localStorage.setItem("is_anonymously", "true");
    setIsAnonymously(true);
    setIsAuthorized(true);
  }

  function signOut() {
    setIsAuthorized(false);
    setIsAnonymously(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_anonymously");
  }

  return (
    <SpotifyAuthContext.Provider
      value={{
        isAuthorized,
        isAnonymously,
        signIn,
        signInAnonymously,
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

export { AuthProvider, useAuthState };
