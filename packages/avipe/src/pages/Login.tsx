import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@avipe/design-system";
import { SpotifyIcon } from "../components/icons/Spotify";
import { UserIcon } from "../components/icons/User";
import { api } from "../core/api";
import { useAuthState } from "../core/hooks/use-auth";
import { Typography } from "../design-system";

function Login() {
  const authState = useAuthState();

  return (
    <Root>
      <BackgroundImageContainer>
        <BackgroundImage src="/login-background.jpg" alt="Background" />
      </BackgroundImageContainer>
      <ContentContainer>
        <Typography.H1>👋 We're ready to see you</Typography.H1>
        <Typography.P style={{ maxWidth: 500 }}>
          To use Avipe you need to sign in using your Spotify account or you can
          simply use it anonymously
        </Typography.P>
        <FormFooter>
          <ButtonWithIcon shape="square" onClick={api.login}>
            <SpotifyIcon />
            <span>Sign In using Spotify</span>
          </ButtonWithIcon>
          <ButtonWithIcon
            shape="square"
            variant="outlined"
            onClick={authState.signInAnonymously}
          >
            <UserIcon />
            <span>Sign In Anonymously</span>
          </ButtonWithIcon>
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

const ButtonWithIcon = styled(Button)(
  ({ theme }) => css`
    width: 100%;

    & > *:not(:last-child) {
      margin-right: ${theme.tokens.spacing[2]};
    }

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      width: unset;
    }
  `
);

const Root = styled.div(
  ({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: ${window.innerHeight}px;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      justify-content: center;
    }
  `
);

const backgroundImageScaleAnimation = keyframes`
  from {
    transform: scale(1);
  }

  60% {
    transform: scale(1.1);
  }

  to {
    transform: scale(1);
  }
`;

const BackgroundImageContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const BackgroundImage = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  filter: brightness(0.4);
  animation: ${backgroundImageScaleAnimation} 24s ease-in-out infinite;
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
    padding: ${theme.tokens.spacing[5]} ${theme.contentPadding} 100px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      text-align: left;
      align-items: flex-start;
    }
  `
);

const FormFooter = styled.div(
  ({ theme }) => css`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    & > *:not(:last-child) {
      margin-bottom: 20px;
    }

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      flex-direction: row;

      & > *:not(:last-child) {
        margin-right: 20px;
        margin-bottom: 0;
      }
    }
  `
);

export { Login };
