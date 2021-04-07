import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { useModal } from "../core/hooks/use-modal";
import { useAuthState } from "../core/hooks/use-auth";
import { Avatar } from "../design-system/Avatar";
import { Button } from "../design-system/Button";
import { Modal } from "../design-system/Modal";
import { CurrentSongInformation } from "./CurrentSongInformation";
import { DashboardIcon } from "./icons/Dashboard";
import { LogoBlackIcon } from "./icons/LogoBlack";
import { PowerIcon } from "./icons/Power";
import { SoundIcon } from "./icons/Sound";
import { TargetIcon } from "./icons/Target";
import { UserIcon } from "./icons/User";

function AuthorizedLayout(props: React.PropsWithChildren<any>) {
  const modalState = useModal();
  const authState = useAuthState();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  function handleSignOutClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.stopPropagation();
    modalState.open();
  }

  function openRouteProfile() {
    navigate("/profile");
  }

  function openRouteHome() {
    navigate("/");
  }

  return (
    <LayoutGrid>
      <LeftNavigation>
        <LogoContainer onClick={openRouteHome}>
          <LogoBlackIcon />
        </LogoContainer>
        <NavigationLinks>
          <NavLink to="/" activeClassName="active" end>
            <DashboardIcon />
            Dashboard
          </NavLink>
          <NavLink to="/sound" activeClassName="active">
            <SoundIcon />
            All Sounds
          </NavLink>
          <NavLink to="/genres" activeClassName="active">
            <TargetIcon />
            Genres
          </NavLink>
        </NavigationLinks>
      </LeftNavigation>
      <TopNavigaiton>
        {currentUser.data ? (
          <CurrentUserInfo onClick={openRouteProfile}>
            <Avatar>
              {currentUser.data.images?.[0].url ? (
                <img src={currentUser.data.images?.[0].url} alt="User Logo" />
              ) : (
                <UserIcon />
              )}
            </Avatar>
            <p>{currentUser.data.display_name}</p>
            <SignOutButton onClick={handleSignOutClick}>
              <PowerIcon />
            </SignOutButton>
          </CurrentUserInfo>
        ) : null}
      </TopNavigaiton>
      <Main>{props.children}</Main>
      <CurrentSongInformation />
      <Modal visible={modalState.visible}>
        <h1>Sign Out</h1>
        <p>Are you sure you want to Sign Out?</p>
        <ModalContent>
          <Button variant="outlined" shape="square" onClick={modalState.close}>
            Cancel
          </Button>
          <Button shape="square" onClick={authState.signOut}>
            Sign Out
          </Button>
        </ModalContent>
      </Modal>
    </LayoutGrid>
  );
}

const LogoContainer = styled.div`
  display: flex;
  padding: 0 40px;
  align-items: center;
  color: #43d17c;
  height: 100%;
  cursor: pointer;
  transition: 0.2s;
  height: 100px;

  :hover {
    color: #36a763;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 80px 1fr;
  height: 100vh;
`;

const LeftNavigation = styled.div(
  ({ theme }) => css`
    position: relative;
    z-index: ${theme.layerManager.leftNavigation};
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    background: ${theme.body.background};
    background: #0f0f16;
  `
);

const TopNavigaiton = styled.div(
  ({ theme }) => css`
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    padding: 16px 48px;
    position: fixed;
    z-index: ${theme.layerManager.topNavigation};
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
  `
);

const CurrentUserInfo = styled.div`
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: rgba(22, 22, 31, 0.9);
  padding: 8px;
  border-radius: 200px;
  cursor: pointer;
  transition: 0.2s;
  color: #ddd;

  :hover {
    color: #fff;
  }
`;

const Main = styled.div`
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavigationLinks = styled.div`
  display: grid;
  grid-auto-rows: 80px;

  a {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    padding: 0 40px;
    align-items: center;
    height: 100%;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;

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

const ModalContent = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
`;

export { AuthorizedLayout };
