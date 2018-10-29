import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import navigation, { map } from "config/navigation";

const HeaderBar = styled.div`
  background: #eee;
  padding: 10px 0;
`;

const HeaderLink = styled(NavLink)`
  color: blue;
  padding: 5px 10px;
  &.active {
    color: red;
  }
`;

export default class Header extends Component {
  render() {
    const links = map(navigation, (path, { display, navExact }, i) => (
      <HeaderLink exact={navExact} to={path} key={i} activeClassName="active">
        {display}
      </HeaderLink>
    ));

    return <HeaderBar>{links}</HeaderBar>;
  }
}
