import styled from "@emotion/styled";
import { Card } from "../design-system/Card";

function Dashboard() {
  return (
    <Root>
      <div>
        <h1>Welcome back, Pavel!</h1>
        <p>How are you feeling today?</p>
      </div>
      <CardGrid>
        <Card>
          <Card.Content>
            <h2>Cardio Meditation</h2>
            <p>Basics of Yoga for Beginners or Experienced Professionals</p>
          </Card.Content>
          <Card.PlayButton />
        </Card>
        <Card>
          <Card.Content>
            <h2>Meditation 101</h2>
            <p>Techniques, Benefits, and a Beginner’s How-To</p>
          </Card.Content>
          <Card.PlayButton />
        </Card>
      </CardGrid>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 320px;
  grid-gap: 20px;
`;

export { Dashboard };
