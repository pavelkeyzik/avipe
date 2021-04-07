import { useQuery } from "react-query";
import { api } from "../api";
import { useAuthState } from "./use-auth";

function useCurrentUser() {
  const authState = useAuthState();

  return useQuery(
    "current-user",
    authState.isAnonymously ? api.getAnonymouslyUserInfo : api.getUserInfo
  );
}

export { useCurrentUser };
