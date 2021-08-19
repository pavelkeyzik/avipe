import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SignOutModal } from "../components/AuthorizedLayout/SignOutModal";
import { UserIcon } from "../components/icons/User";
import { MainContentLayout } from "../components/MainContentLayout";
import { useAuthState } from "../core/hooks/use-auth";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { useModal } from "../core/hooks/use-modal";
import { Button, Typography } from "../design-system";
import { Avatar } from "../design-system/Avatar";

function Profile() {
  const currentUser = useCurrentUser();
  const modalState = useModal();
  const authState = useAuthState();

  if (currentUser.isLoading) {
    return (
      <RootGrid>
        <Typography.H2>Profile</Typography.H2>
        <div>Loading...</div>
      </RootGrid>
    );
  }

  return (
    <RootGrid>
      <Typography.H2>Profile</Typography.H2>
      <ProfileHeader>
        <Avatar variant="large">
          {currentUser.data.images?.[0]?.url ? (
            <img src={currentUser.data.images?.[0]?.url} alt="User Logo" />
          ) : (
            <UserIcon />
          )}
        </Avatar>
        <div>
          <Typography.H1>Hi, {currentUser.data.display_name}</Typography.H1>
          <Typography.P>Login: {currentUser.data.id}</Typography.P>
          <Typography.P>E-mail: {currentUser.data.email}</Typography.P>
          <Typography.P>
            Followers: {currentUser.data.followers.total}
          </Typography.P>
          <Typography.P>Country: {currentUser.data.country}</Typography.P>
        </div>
      </ProfileHeader>
      <SignOutContainer>
        <Button onClick={modalState.open}>Sign Out</Button>
      </SignOutContainer>
      <SignOutModal
        visible={modalState.visible}
        onCancel={modalState.close}
        onOk={authState.signOut}
      />
    </RootGrid>
  );
}

const RootGrid = styled(MainContentLayout)`
  display: grid;
  grid-gap: 20px;
`;

const ProfileHeader = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      flex-direction: row;

      & > *:not(:last-child) {
        margin-right: 40px;
      }
    }
  `
);

const SignOutContainer = styled.div(
  ({ theme }) => css`
    display: flex;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      display: none;
    }
  `
);

export { Profile };
