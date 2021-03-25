import styled from "@emotion/styled";
import { Card } from "../design-system/Card";

function Dashboard() {
  return (
    <Root>
      <div>
        <h1>Welcome back, Pavel!</h1>
        <p>How are you feeling today?</p>
      </div>
      <Card>
        <h2>Cardio Meditation</h2>
        <p>Basics of Yoga for Beginners or Experienced Professionals</p>
        <Card.PlayButton />
      </Card>
      <Card>
        <h2>Meditation 101</h2>
        <p>Techniques, Benefits, and a Beginner’s How-To</p>
        <Card.PlayButton />
      </Card>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export { Dashboard };
