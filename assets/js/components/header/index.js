import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderBar = styled.div`
  background: #eee;
`;

export default class Header extends Component {
  render() {
    return (
      <HeaderBar>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/blog">Blog</Link>
      </HeaderBar>
    );
  }
}
