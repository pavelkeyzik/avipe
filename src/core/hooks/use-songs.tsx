import { useQuery } from "react-query";
import { api } from "../api";

function useSongsList() {
  return useQuery("songs-list", api.getSongsList);
}

export { useSongsList };
