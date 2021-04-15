import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Avatar, PowerIcon } from "@avipe/design-system";
import { useAuthState, useCurrentUser, useModal } from "@avipe/core";
import { SignOutModal } from "./SignOutModal";

function Header() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const modalState = useModal();
  const authState = useAuthState();

  function handleSignOutClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.stopPropagation();
    modalState.open();
  }

  function openRouteProfile() {
    navigate("/profile");
  }

  return (
    <React.Fragment>
      <Root>
        {currentUser.data ? (
          <CurrentUserInfo onClick={openRouteProfile}>
            <Avatar src={currentUser.data.images?.[0].url} />
            <p>{currentUser.data.display_name}</p>
            <SignOutButton onClick={handleSignOutClick}>
              <PowerIcon />
            </SignOutButton>
          </CurrentUserInfo>
        ) : null}
      </Root>
      <SignOutModal
        visible={modalState.visible}
        onCancel={modalState.close}
        onOk={authState.signOut}
      />
    </React.Fragment>
  );
}

const Root = styled.div(
  ({ theme }) => css`
    display: none;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 48px;
      position: fixed;
      z-index: ${theme.layerManager.header};
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

      justify-content: flex-end;
    }
  `
);

const CurrentUserInfo = styled.div`
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(22, 22, 31, 0.9);
  padding: 8px;
  border-radius: 200px;
  cursor: pointer;
  transition: 0.2s;
  color: #ddd;

  & > *:not(:last-child) {
    margin-right: 20px;
  }

  :hover {
    color: #fff;
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

export { Header };
