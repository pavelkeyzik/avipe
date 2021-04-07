import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../core/hooks/use-current-user";
import { useModal } from "../../core/hooks/use-modal";
import { useAuthState } from "../../core/hooks/use-auth";
import { PowerIcon } from "../icons/Power";
import { UserIcon } from "../icons/User";
import { Avatar, Button, Modal, Typography } from "../../design-system";

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
      </Root>
      <Modal visible={modalState.visible}>
        <Typography.H1>Sign Out</Typography.H1>
        <Typography.P>Are you sure you want to Sign Out?</Typography.P>
        <ModalContent>
          <Button variant="outlined" shape="square" onClick={modalState.close}>
            Cancel
          </Button>
          <Button shape="square" onClick={authState.signOut}>
            Sign Out
          </Button>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

const Root = styled.div(
  ({ theme }) => css`
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
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

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      justify-content: flex-end;
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

export { Header };
