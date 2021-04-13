import styled from "@emotion/styled";
import React from "react";
import { Typography } from "@avipe/design-system";
import { MainContentLayout } from "../components/MainContentLayout";
import { SoundPlaylist } from "../components/SoundPlaylist";
import { useSongsList } from "../core/hooks/use-songs";

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
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export { SoundList };
