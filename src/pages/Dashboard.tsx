import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import { SoundPlaylist } from "../components/SoundPlaylist";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { usePlaylists, useSongsList } from "../core/hooks/use-songs";
import { Card } from "../design-system/Card";

function Dashboard() {
  const navigate = useNavigate();
  const songsList = useSongsList();
  const currentUser = useCurrentUser();
  const playlists = usePlaylists();

  if (songsList.isLoading || playlists.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Root>
      <div>
        <h1>Welcome back, {currentUser.data?.display_name ?? "..."}!</h1>
        <p>We prepared a lot of things for you...</p>
      </div>
      <h2>Genres</h2>
      <GenresGrid>
        <a href="/">Binaural Beats</a>
        <a href="/">Monaural beats</a>
        <a href="/">Solfeggio Frequencies</a>
        <a href="/">World</a>
        <a href="/">Chant</a>
        <a href="/">Classical</a>
        <a href="/">Ambient</a>
        <a href="/">Isochronic</a>
        <a href="/">Nature</a>
        <a href="/">Instruments</a>
      </GenresGrid>
      <h2>Playlists</h2>
      <CardGrid>
        {playlists.data.map((playlist: any) => {
          function openPlaylist() {
            navigate(`playlist/${playlist.id}`);
          }

          return (
            <Card key={playlist.id}>
              <Card.Content>
                <h2>{playlist.name}</h2>
                <p>{playlist.description}</p>
              </Card.Content>
              <Card.PlayButton onClick={openPlaylist} />
            </Card>
          );
        })}
      </CardGrid>

      <h2>Recent Sounds</h2>
      <SoundPlaylist songs={songsList.data} />
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;

const GenresGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export { Dashboard };
