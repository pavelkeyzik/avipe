import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router";
import { SoundPlaylist } from "../../components/SoundPlaylist";
import { useSongsList } from "../../core/hooks/use-songs";
import { Button } from "../../design-system/Button";

function RecentSounds() {
  const navigate = useNavigate();
  const songsList = useSongsList({
    limit: 5,
  });

  function openRouteAllSounds() {
    navigate("sound");
  }

  return (
    <RootGrid>
      <h2>Recent Sounds</h2>
      <SoundPlaylist isLoading={songsList.isLoading} songs={songsList.data} />
      {songsList.data && songsList.data.length > 0 ? (
        <MoreSoundsContainer>
          <Button onClick={openRouteAllSounds}>Show More Sounds</Button>
        </MoreSoundsContainer>
      ) : null}
    </RootGrid>
  );
}

const RootGrid = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const MoreSoundsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export { RecentSounds };
