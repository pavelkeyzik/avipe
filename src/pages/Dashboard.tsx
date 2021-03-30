import styled from "@emotion/styled";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { useMeditationPlaylists } from "../core/hooks/use-meditation-playlists";
import { Card } from "../design-system/Card";

function Dashboard() {
  const meditationPlaylists = useMeditationPlaylists();
  const currentUser = useCurrentUser();

  if (meditationPlaylists.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Root>
      <div>
        <h1>Welcome back, {currentUser.data?.display_name ?? "..."}!</h1>
        <p>How are you feeling today?</p>
      </div>
      <CardGrid>
        {meditationPlaylists.data?.playlists.items.map((item) => (
          <Card key={item.id}>
            {/* <Card.ImageContainer>
              <img src={item.images[0].url} alt="Album cover" />
            </Card.ImageContainer> */}
            <Card.Content>
              <span>{item.tracks.total} Tracks</span>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </Card.Content>
            <Card.PlayButton />
          </Card>
        ))}
      </CardGrid>
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

export { Dashboard };
