import { useQuery } from "react-query";
import { api } from "@avipe/core";

function useMeditationPlaylists() {
  return useQuery("meditation-playlists", api.getPlaylists);
}

export { useMeditationPlaylists };
