import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SpotifyIcon } from "../components/icons/Spotify";
import { api } from "../core/api";
import { Button } from "../design-system/Button";

function Login() {
  return (
    <Root>
      <BackgroundImage src="/login-background.jpg" alt="Background" />
      <ContentContainer>
        <h1>👋 We're ready to see you</h1>
        <p>To use Avipe you need to sign in using Spotify account</p>
        <FormFooter>
          <Button shape="square" onClick={api.login}>
            <SpotifyIcon /> Sign In
          </Button>
        </FormFooter>
      </ContentContainer>
      <BackgroundImageInfo>
        Photo by{" "}
        <a
          href="https://unsplash.com/@danielmingookkim"
          target="_blank"
          rel="noreferrer"
        >
          Daniel Mingook Kim
        </a>
      </BackgroundImageInfo>
    </Root>
  );
}

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  z-index: -1;
  object-fit: cover;
  width: 100%;
  height: 100%;
  filter: brightness(0.4);
`;

const BackgroundImageInfo = styled.div`
  position: absolute;
  right: 32px;
  bottom: 32px;
`;

const ContentContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 ${theme.contentPadding};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `
);

const FormFooter = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export { Login };
