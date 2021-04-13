import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../core/api";
import { parse } from "query-string";
import { useAuthState } from "../core/hooks/use-auth";
import styled from "@emotion/styled";
import { RedirectIllustration } from "../components/illustrations/Redirect";
import { keyframes } from "@emotion/react";

function SpotifyAuthCallback() {
  const state = useLocation();
  const [isOkayToRedirect, setIsOkayToRedirect] = useState(false);
  const [isAuthorizedToRedirect, setIsAuthorizedToRedirect] = useState(false);
  const queryParams = parse(state.search);
  const authState = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsOkayToRedirect(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (queryParams.code && typeof queryParams.code === "string") {
      api.getAccessToken(queryParams.code).then(() => {
        setIsAuthorizedToRedirect(true);
      });
    }
  }, [queryParams, authState, navigate]);

  useEffect(() => {
    if (isOkayToRedirect && isAuthorizedToRedirect) {
      authState.signIn();
      navigate("/");
    }
  }, [authState, navigate, isOkayToRedirect, isAuthorizedToRedirect]);

  return (
    <Root>
      <RedirectIllustration height={200} />
      <span>You're being redirected, please, wait...</span>
    </Root>
  );
}

const lightAnimation = keyframes`
  from {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
`;

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: ${window.innerHeight}px;
  overflow: hidden;

  & > *:not(:last-child) {
    margin-bottom: 40px;
  }

  ::after {
    position: absolute;
    content: "";
    width: 1000px;
    height: 1000px;
    z-index: -1;
    background: radial-gradient(rgb(79, 79, 111, 0.2), transparent 40%);
    animation: ${lightAnimation} 1s ease-in-out infinite;
  }
`;

export { SpotifyAuthCallback };
