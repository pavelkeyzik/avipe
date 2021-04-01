import { useQuery } from "react-query";
import { api } from "../api";

type SongsListOptions = {
  limit?: number;
};

function useSongsList(options?: SongsListOptions) {
  return useQuery(["songs-list", options], () =>
    api.getSongsList(options?.limit)
  );
}

function usePlaylists() {
  return useQuery("playlists-list", api.getPlaylists);
}

function usePlaylist(id: number) {
  return useQuery(["playlist", id], () => api.getPlaylist(id));
}

export { useSongsList, usePlaylists, usePlaylist };
