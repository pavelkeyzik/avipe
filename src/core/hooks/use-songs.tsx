import { useQuery } from "react-query";
import { api } from "../api";

function useSongsList() {
  return useQuery("songs-list", api.getSongsList);
}

function usePlaylists() {
  return useQuery("playlists-list", api.getPlaylists);
}

export { useSongsList, usePlaylists };
