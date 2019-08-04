import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import navigation, { map } from "config/navigation";

const HeaderBar = styled.div`
  background: #042f4b;
  padding: 24px 0;
`;

const HeaderLink = styled(NavLink)`
  color: #fff6da;
  padding: 5px 10px;
  text-transform: uppercase;
  font-size: 16px;
  &.active {
    color: #fbc99d;
    font-weight: bold;
  }
`;

export default class Header extends Component {
  render() {
    const links = map(navigation, (path, { display, navExact }, i) => (
      <HeaderLink exact={navExact} to={path} key={i} activeClassName="active">
        {display}
      </HeaderLink>
    ));

    return (
      <HeaderBar>
        <div className="container mx-auto">
          {links}
        </div>
      </HeaderBar>
    );
  }
}
