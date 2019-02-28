import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <ol>
          <li>
            <NavLink exact to="/" activeClassName="selected">
              首页
            </NavLink>
          </li>
          <li>
            <NavLink to="/block" activeClassName="selected">
              区块
            </NavLink>
          </li>
        </ol>
      </header>
    );
  }
}

export default Header;
