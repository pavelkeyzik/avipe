import React, { createContext, useContext, useEffect, useState } from "react";

const SpotifyAuthContext = createContext({
  isAuthorized: false,
  signIn: () => {},
});

function SpotifyAuthProvider(props: React.PropsWithChildren<any>) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (storedToken) {
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
