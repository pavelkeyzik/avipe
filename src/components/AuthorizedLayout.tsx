import styled from "@emotion/styled";
import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../core/hooks/use-current-user";
import { Avatar } from "../design-system/Avatar";
import { CurrentSongInformation } from "./CurrentSongInformation";
import { DashboardIcon } from "./icons/Dashboard";
import { LogoBlackNoTextIcon } from "./icons/LogoBlack";
import { SoundIcon } from "./icons/Sound";
import { UserIcon } from "./icons/User";

function AuthorizedLayout(props: React.PropsWithChildren<any>) {
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
          <NavLink to="/profile" activeClassName="active">
            <UserIcon />
          </NavLink>
        </Navigation>
      </LeftNavigation>
      <TopNavigaiton>
        {currentUser.data ? (
          <React.Fragment>
            <p>{currentUser.data.display_name}</p>
            <Avatar>
              <img src={currentUser.data.images?.[0].url} alt="User Logo" />
            </Avatar>
          </React.Fragment>
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
  grid-template-rows: 80px 1fr 100px;
  height: 100vh;
`;

const LeftNavigation = styled.div`
  grid-row: 1 / 3;
  grid-column: 1 / 2;
`;

const TopNavigaiton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding: 0 48px;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`;

const Main = styled.div`
  padding: 0 48px 40px;
  grid-row: 2 / 3;
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

export { AuthorizedLayout };
