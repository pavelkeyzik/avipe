import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { useAuthState } from "../core/hooks/use-spotify-auth";
import { Avatar } from "../design-system/Avatar";
import { CurrentSongInformation } from "./CurrentSongInformation";
import { DashboardIcon } from "./icons/Dashboard";
import { LogoBlackNoTextIcon } from "./icons/LogoBlack";
import { PowerIcon } from "./icons/Power";
import { SoundIcon } from "./icons/Sound";

function AuthorizedLayout(props: React.PropsWithChildren<any>) {
  const authState = useAuthState();
  const currentUser = useCurrentUser();

  return (
    <LayoutGrid>
      <LeftNavigation>
        <Navigation>
          <LogoContainer>
            <LogoBlackNoTextIcon />
          </LogoContainer>
          <NavLink to="/" activeClassName="active" end>
            <DashboardIcon />
          </NavLink>
          <NavLink to="/sound" activeClassName="active">
            <SoundIcon />
          </NavLink>
        </Navigation>
      </LeftNavigation>
      <TopNavigaiton>
        {currentUser.data ? (
          <CurrentUserInfo>
            <Avatar>
              <img src={currentUser.data.images?.[0].url} alt="User Logo" />
            </Avatar>
            <p>{currentUser.data.display_name}</p>
            <SignOutButton onClick={authState.signOut}>
              <PowerIcon />
            </SignOutButton>
          </CurrentUserInfo>
        ) : null}
      </TopNavigaiton>
      <Main>{props.children}</Main>
      <CurrentSongInformation />
    </LayoutGrid>
  );
}

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #43d17c;
  height: 100%;
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-rows: 80px 1fr;
  height: 100vh;
`;

const LeftNavigation = styled.div(
  ({ theme }) => css`
    position: relative;
    z-index: 15;
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    background: ${theme.body.background};
  `
);

const TopNavigaiton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding: 16px 48px;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  width: 100%;

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 160px;
    z-index: -1;
  }
`;

const CurrentUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(22, 22, 31, 0.9);
  padding: 8px;
  border-radius: 200px;
`;

const Main = styled.div`
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Navigation = styled.div`
  display: grid;
  align-items: stretch;
  grid-auto-rows: 100px;
  align-items: center;
  min-height: 120px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: rgba(255, 255, 255, 0.5);

    &.active {
      color: #fff;
    }
  }
`;

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    background: white;
    color: #000;
  }
`;

export { AuthorizedLayout };
