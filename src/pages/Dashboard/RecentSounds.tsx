import { css } from "@emotion/react";
import styled from "@emotion/styled";
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
  position: relative;
  display: grid;
  grid-gap: 20px;
`;

const MoreSoundsContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(transparent, ${theme.body.background});
    min-height: 240px;
  `
);

export { RecentSounds };
