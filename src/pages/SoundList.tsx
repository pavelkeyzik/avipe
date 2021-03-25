import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import { Card } from "../design-system/Card";
import { SoundCard } from "../design-system/SoundCard";

function SoundList() {
  const navigate = useNavigate();

  function playSound() {
    navigate("play");
  }

  return (
    <RootGrid>
      <Card>
        <h2>Meditation 101</h2>
        <p>Techniques, Benefits, and a Beginner’s How-To</p>
        <Card.PlayButton onClick={playSound} />
      </Card>
      <RootListGrid>
        <SoundCard
          coverURL="https://source.unsplash.com/user/pavelkeyzik/80x80"
          title="Painting Forest"
          time={30}
          onClick={playSound}
        />
        <SoundCard
          coverURL="https://source.unsplash.com/user/pavelkeyzik/80x80"
          title="Mountaineers"
          time={15}
          onClick={playSound}
        />
        <SoundCard
          coverURL="https://source.unsplash.com/user/pavelkeyzik/80x80"
          title="Three Days Grace"
          time={15}
          onClick={playSound}
        />
        <SoundCard
          coverURL="https://source.unsplash.com/user/pavelkeyzik/80x80"
          title="Lovely Deserts"
          time={25}
          onClick={playSound}
        />
        <SoundCard
          coverURL="https://source.unsplash.com/user/pavelkeyzik/80x80"
          title="The Hill Sides"
          time={40}
          onClick={playSound}
        />
      </RootListGrid>
    </RootGrid>
  );
}

const RootGrid = styled.div`
  display: grid;
  grid-gap: 40px;
`;

const RootListGrid = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export { SoundList };
