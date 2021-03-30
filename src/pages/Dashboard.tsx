import styled from "@emotion/styled";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { usePlayer } from "../core/hooks/use-player";
import { useSongsList } from "../core/hooks/use-songs";
import { Card } from "../design-system/Card";
import { SoundCard } from "../design-system/SoundCard";

function Dashboard() {
  const player = usePlayer();
  const songsList = useSongsList();
  const currentUser = useCurrentUser();

  if (songsList.isLoading) {
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
        <Card>
          <Card.Content>
            <span>2 Tracks</span>
            <h2>If you're sad</h2>
            <p>We'll try to help you be more happy about this life</p>
          </Card.Content>
          <Card.PlayButton />
        </Card>
        <Card>
          <Card.Content>
            <span>14 Tracks</span>
            <h2>If you're mad</h2>
            <p>
              With this playlist you'll get enough energy to calm down an be
              more quiet
            </p>
          </Card.Content>
          <Card.PlayButton />
        </Card>
        <Card>
          <Card.Content>
            <span>7 Tracks</span>
            <h2>If you didn't get enough sleep</h2>
            <p>Helps you wake up and get things done</p>
          </Card.Content>
          <Card.PlayButton />
        </Card>
        <Card>
          <Card.Content>
            <span>5 Tracks</span>
            <h2>Quiet launch</h2>
            <p>Just eat with feelings of liberty</p>
          </Card.Content>
          <Card.PlayButton />
        </Card>
      </CardGrid>

      <h2>Recent Sounds</h2>
      <RecentSoundsListGrid>
        {songsList.data.map((song: any) => (
          <SoundCard
            key={song.id}
            songData={song}
            onClick={player.playSelectedSong}
            isPlaying={
              player.currentSong ? player.currentSong.id === song.id : false
            }
          />
        ))}
      </RecentSoundsListGrid>
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

const RecentSoundsListGrid = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export { Dashboard };
