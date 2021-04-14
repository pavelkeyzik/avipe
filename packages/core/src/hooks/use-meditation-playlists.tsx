import { useQuery } from 'react-query';
import { api } from '../api';

function useMeditationPlaylists() {
  return useQuery('meditation-playlists', api.getPlaylists);
}

export { useMeditationPlaylists };
