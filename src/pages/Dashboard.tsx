import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import { Card } from "../design-system/Card";

function Dashboard() {
  const navigate = useNavigate();

  function playSound() {
    navigate("sound/play");
  }

  return (
    <Root>
      <div>
        <h1>Welcome back, Pavel!</h1>
        <p>How are you feeling today?</p>
      </div>
      <Card>
        <h2>Cardio Meditation</h2>
        <p>Basics of Yoga for Beginners or Experienced Professionals</p>
        <Card.PlayButton onClick={playSound} />
      </Card>
      <Card>
        <h2>Meditation 101</h2>
        <p>Techniques, Benefits, and a Beginner’s How-To</p>
        <Card.PlayButton onClick={playSound} />
      </Card>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export { Dashboard };
