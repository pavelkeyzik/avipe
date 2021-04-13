import styled from "@emotion/styled";
import { MainContentLayout } from "../../components/MainContentLayout";
import { Playlists } from "./Playlists";
import { RecentSounds } from "./RecentSounds";

function Dashboard() {
  return (
    <Root>
      <Playlists />
      <RecentSounds />
    </Root>
  );
}

const Root = styled(MainContentLayout)`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export { Dashboard };
