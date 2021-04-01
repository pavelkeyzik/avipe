import styled from "@emotion/styled";
import React from "react";
import { SoundPlaylist } from "../components/SoundPlaylist";
import { useSongsList } from "../core/hooks/use-songs";

function SoundListLayout(props: React.PropsWithChildren<unknown>) {
  return (
    <RootGrid>
      <h2>All Sounds</h2>
      {props.children}
    </RootGrid>
  );
}

function SoundList() {
  const songsList = useSongsList();

  return (
    <SoundListLayout>
      <SoundPlaylist isLoading={songsList.isLoading} songs={songsList.data} />
    </SoundListLayout>
  );
}

const RootGrid = styled.div`
  display: grid;
  grid-gap: 40px;
`;

export { SoundList };
