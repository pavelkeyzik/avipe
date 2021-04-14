import { useQuery } from "react-query";
import { api, useAuthState } from "@avipe/core";

function useCurrentUser() {
  const authState = useAuthState();

  return useQuery(
    "current-user",
    authState.isAnonymously ? api.getAnonymouslyUserInfo : api.getUserInfo
  );
}

export { useCurrentUser };
