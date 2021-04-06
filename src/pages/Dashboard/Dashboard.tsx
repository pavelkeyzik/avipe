import styled from "@emotion/styled";
import { MainContentLayout } from "../../components/MainContentLayout";
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
      <Playlists />
      <RecentSounds />
    </Root>
  );
}

const Root = styled(MainContentLayout)`
  display: grid;
  grid-gap: 20px;
`;

export { Dashboard };
