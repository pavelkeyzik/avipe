import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { ContentWidth } from "../components/ContentWidth";
import { Avatar } from "../design-system/Avatar";
import { DashboardIcon } from "./icons/Dashboard";
import { LogoBlackIcon } from "./icons/LogoBlack";
import { SoundIcon } from "./icons/Sound";
import { UserIcon } from "./icons/User";

function AuthorizedLayout(props: React.PropsWithChildren<any>) {
  return (
    <ContentWidth>
      <LayoutGrid>
        <TopNavigation>
          <LogoBlackIcon />
          <Avatar>
            <img
              src="https://source.unsplash.com/user/pavelkeyzik/60x60"
              alt="User Logo"
            />
          </Avatar>
        </TopNavigation>
        <Main>{props.children}</Main>
        <BottomNavigation>
          <NavLink to="/" activeClassName="active" end>
            <DashboardIcon />
          </NavLink>
          <NavLink to="/sound" activeClassName="active">
            <SoundIcon />
          </NavLink>
          <NavLink to="/profile" activeClassName="active">
            <UserIcon />
          </NavLink>
        </BottomNavigation>
      </LayoutGrid>
    </ContentWidth>
  );
}

const LayoutGrid = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const TopNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 120px;
`;

const BottomNavigation = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 120px;

  a {
    color: rgba(255, 255, 255, 0.5);

    &.active {
      color: #fff;
    }
  }
`;

export { AuthorizedLayout };
