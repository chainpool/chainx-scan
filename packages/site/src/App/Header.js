import React, { useState } from "react";
import classnames from "classnames";
import { NavLink, withRouter } from "react-router-dom";
import { matchPath } from "react-router";

import ChainxLogo from "../assets/chainxLogo.png";

export default withRouter(function Header(props) {
  const { location } = props;
  const [showMenu, setShowMenu] = useState(false);

  const matchesArray = ["/txs", "/events"];

  let isMatchBlocks = false;

  for (const path of matchesArray) {
    if (matchPath(location.pathname, { path })) {
      isMatchBlocks = true;
      break;
    }
  }

  const navBarStart = (
    <div className="navbar-start">
      <NavLink exact className="navbar-item is-tab" activeClassName="is-active" to="/">
        首页
      </NavLink>
      <NavLink
        className={classnames("navbar-item is-tab", { "is-active": isMatchBlocks })}
        activeClassName="is-active"
        to="/blocks"
      >
        区块链
      </NavLink>
    </div>
  );

  const navBarEnd = (
    <div className="navbar-end">
      <div className="navbar-item">
        <input
          style={{ minWidth: 350 }}
          className="input is-rounded"
          type="text"
          placeholder="搜索区块高度,区块哈希,交易哈希或地址"
        />
      </div>
    </div>
  );

  const isActiveClass = {
    "is-active": showMenu
  };

  return (
    <nav className="navbar is-black" role="navigation">
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-item" activeClassName="selected">
            <img src={ChainxLogo} alt="chainx" width="112" height="28" />
          </NavLink>
          <a
            role="button"
            className={classnames("navbar-burger burger", isActiveClass)}
            onClick={() => setShowMenu(!showMenu)}
          >
            <span />
            <span />
            <span />
          </a>
        </div>

        <div className={classnames("navbar-menu", isActiveClass)}>
          {navBarStart}
          {navBarEnd}
        </div>
      </div>
    </nav>
  );
});
