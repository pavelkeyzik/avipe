import styled from "@emotion/styled";
import { MainContentLayout } from "../components/MainContentLayout";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { Avatar } from "../design-system/Avatar";

function Profile() {
  const currentUser = useCurrentUser();

  if (currentUser.isLoading) {
    return (
      <RootGrid>
        <h2>Profile</h2>
        <div>Loading...</div>
      </RootGrid>
    );
  }

  return (
    <RootGrid>
      <h2>Profile</h2>
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        <Avatar variant="large">
          <img src={currentUser.data.images?.[0].url} alt="User Logo" />
        </Avatar>
        <div>
          <h1 style={{ margin: 0 }}>Hi, {currentUser.data.display_name}</h1>
          <div>Login: {currentUser.data.id}</div>
          <div>E-mail: {currentUser.data.email}</div>
          <div>Followers: {currentUser.data.followers.total}</div>
          <div>Country: {currentUser.data.country}</div>
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
