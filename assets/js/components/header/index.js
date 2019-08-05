import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import navigation, { map } from "config/navigation";

const HeaderLink = styled(NavLink)``;

export default class Header extends Component {
  render() {
    const links = map(navigation, (path, { display, navExact }, i) => (
      <HeaderLink
        exact={navExact}
        to={path}
        key={i}
        activeClassName="text-blue-200"
        className="bg-blue-500 rounded pl-8 pr-8 pt-4 pb-4 mr-3 ml-3 text-white"
      >
        {display}
      </HeaderLink>
    ));

    return (
      <div className="bg-gray-100 border-b-2 border border-gray-200">
        <div className="container mx-auto">
          <div className="p-8">{links}</div>
        </div>
      </div>
    );
  }
}
