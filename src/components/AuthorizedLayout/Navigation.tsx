import { NavLink, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { DashboardIcon } from "../icons/Dashboard";
import { LogoBlackIcon } from "../icons/LogoBlack";
import { SoundIcon } from "../icons/Sound";
import { TargetIcon } from "../icons/Target";

function Navigation() {
  const navigate = useNavigate();

  function openRouteHome() {
    navigate("/");
  }

  return (
    <Root>
      <LogoContainer onClick={openRouteHome}>
        <LogoBlackIcon />
      </LogoContainer>
      <NavigationLinks>
        <NavLink to="/" activeClassName="active" end>
          <DashboardIcon />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/sound" activeClassName="active">
          <SoundIcon />
          <span>All Sounds</span>
        </NavLink>
        <NavLink to="/genres" activeClassName="active">
          <TargetIcon />
          <span>Genres</span>
        </NavLink>
      </NavigationLinks>
    </Root>
  );
}

const Root = styled.div(
  ({ theme }) => css`
    position: relative;
    z-index: ${theme.layerManager.navigation};
    grid-row: 4 / 5;
    grid-column: 1 / 2;
    background: ${theme.body.background};
    background: #0f0f16;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      grid-row: 1 / 4;
      grid-column: 0 / 1;
    }
  `
);

const LogoContainer = styled.div(
  ({ theme }) => css`
    display: none;

    @media (min-width: ${theme.tokens.breakpoints.md}) {
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
    }
  `
);

const NavigationLinks = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    min-height: 60px;

    a {
      display: flex;
      justify-content: center;
      gap: 20px;
      padding: 0 40px;
      align-items: center;
      height: 100%;
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;

      span {
        display: none;
      }

      &.active {
        color: #fff;
      }
    }

    @media (min-width: ${theme.tokens.breakpoints.md}) {
      grid-template-columns: unset;
      grid-auto-rows: 80px;

      a {
        justify-content: flex-start;

        span {
          display: inline-block;
        }
      }
    }
  `
);

export { Navigation };
