import styled from "@emotion/styled";
import { useCurrentUser } from "../../core/hooks/use-current-user";
import { Playlists } from "./Playlists";
import { RecentSounds } from "./RecentSounds";

function Dashboard() {
  const currentUser = useCurrentUser();

  return (
    <Root>
      <div>
        <h1>Welcome back, {currentUser.data?.display_name ?? "..."}!</h1>
        <p>We prepared a lot of things for you...</p>
      </div>
      {/* <h2>Genres</h2>
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
      </GenresGrid> */}
      <Playlists />
      <RecentSounds />
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-gap: 20px;
`;

// const GenresGrid = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
// `;

export { Dashboard };
