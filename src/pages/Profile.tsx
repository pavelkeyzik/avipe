import styled from "@emotion/styled";
import { UserIcon } from "../components/icons/User";
import { MainContentLayout } from "../components/MainContentLayout";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { Typography } from "../design-system";
import { Avatar } from "../design-system/Avatar";

function Profile() {
  const currentUser = useCurrentUser();

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
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        <Avatar variant="large">
          {currentUser.data.images?.[0].url ? (
            <img src={currentUser.data.images?.[0].url} alt="User Logo" />
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
      </div>
    </RootGrid>
  );
}

const RootGrid = styled(MainContentLayout)`
  display: grid;
  grid-gap: 20px;
`;

export { Profile };
