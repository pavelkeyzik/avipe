import { MainContentLayout } from "../components/MainContentLayout";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { Avatar } from "../design-system/Avatar";

function Profile() {
  const currentUser = useCurrentUser();

  if (currentUser.isLoading) {
    return (
      <MainContentLayout>
        <h2>Profile</h2>
        <div>Loading...</div>
      </MainContentLayout>
    );
  }

  return (
    <MainContentLayout>
      <h2>Profile</h2>
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 40,
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
    </MainContentLayout>
  );
}

export { Profile };
