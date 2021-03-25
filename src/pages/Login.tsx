import styled from "@emotion/styled";
import { ContentWidth } from "../components/ContentWidth";
import { Button } from "../design-system/Button";
import { Input } from "../design-system/Input";

function Login() {
  return (
    <Root>
      <ContentWidth>
        <h1>Let's sign you in.</h1>
        <p>To use application you have to sign in</p>
        <FormGrid>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <FormFooter>
            <Button shape="square">Sign In</Button>
          </FormFooter>
        </FormGrid>
      </ContentWidth>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const FormGrid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-gap: 20px;
`;

const FormFooter = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export { Login };
