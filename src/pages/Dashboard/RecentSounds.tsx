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
      <SoundListContainer>
        <SoundPlaylist isLoading={songsList.isLoading} songs={songsList.data} />
        <SoundsFading />
      </SoundListContainer>
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

const MoreSoundsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 3;
`;

const SoundListContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const SoundsFading = styled.div(
  ({ theme }) => css`
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(transparent, ${theme.body.background});
    min-height: 340px;
    pointer-events: none;
    transform: scaleY(1.1) scaleX(1.1);
    z-index: 2;
  `
);

export { RecentSounds };
