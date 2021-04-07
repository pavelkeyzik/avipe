import styled from "@emotion/styled";
import React from "react";
import { MainContentLayout } from "../components/MainContentLayout";
import { SoundPlaylist } from "../components/SoundPlaylist";
import { useSongsList } from "../core/hooks/use-songs";
import { Typography } from "../design-system";

function SoundListLayout(props: React.PropsWithChildren<unknown>) {
  return (
    <RootGrid>
      <Typography.H2>All Sounds</Typography.H2>
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

const RootGrid = styled(MainContentLayout)`
  display: grid;
  grid-gap: 20px;
`;

export { SoundList };
