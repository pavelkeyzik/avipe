import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "../design-system/Button";
import { Input } from "../design-system/Input";

function Login() {
  return (
    <Root>
      <ContentContainer>
        <h1>Let's sign you in.</h1>
        <p>To use application you have to sign in</p>
        <FormGrid>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <FormFooter>
            <Button shape="square">Sign In</Button>
          </FormFooter>
        </FormGrid>
      </ContentContainer>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const ContentContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 ${theme.contentPadding};
  `
);

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
