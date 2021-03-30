import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../core/api";
import { parse } from "query-string";
import { useAuthState } from "../core/hooks/use-spotify-auth";

function SpotifyAuthCallback() {
  const state = useLocation();
  const queryParams = parse(state.search);
  const authState = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (queryParams.code && typeof queryParams.code === "string") {
      api.getAccessToken(queryParams.code).then(() => {
        authState.signIn();
        navigate("/");
      });
    }
  }, [queryParams, authState, navigate]);

  return <div>Redirection to the application...</div>;
}

export { SpotifyAuthCallback };
