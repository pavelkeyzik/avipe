import { useQuery } from "react-query";
import { api } from "../api";

function useCurrentUser() {
  return useQuery("current-user", api.getUserInfo);
}

export { useCurrentUser };
