import React, { useState } from "react";
import classnames from "classnames";
import { NavLink, withRouter } from "react-router-dom";
import { matchPath } from "react-router";

import { FormattedMessage } from "react-intl";

import ChainxLogo from "../assets/chainxLogo.png";
import { InputSearch } from "../components";

export default withRouter(function Header(props) {
  const { location } = props;
  const [showMenu, setShowMenu] = useState(false);

  const isMatchBlocks = ["/txs", "/events", "/accounts"].some(path => !!matchPath(location.pathname, { path }));
  const isMatchCross = ["/crossblocks", "/crosstxs", "/crossbind"].some(
    path => !!matchPath(location.pathname, { path })
  );

  const navBarStart = (
    <div className="navbar-start">
      <NavLink exact className="navbar-item is-tab" activeClassName="is-active" to="/">
        <FormattedMessage id="HOME" />
      </NavLink>
      <NavLink
        className={classnames("navbar-item is-tab", { "is-active": isMatchBlocks })}
        activeClassName="is-active"
        to="/blocks"
      >
        <FormattedMessage id="BLOCKCHAIN" />
      </NavLink>
      <NavLink className="navbar-item is-tab" activeClassName="is-active" to="/validators">
        <FormattedMessage id="VALIDTORS" />
      </NavLink>
      <NavLink
        className={classnames("navbar-item is-tab", { "is-active": isMatchCross })}
        activeClassName="is-active"
        to="/crossblocks"
      >
        <FormattedMessage id="CROSSBLOCKS" />
      </NavLink>
      <NavLink className="navbar-item is-tab" activeClassName="is-active" to="/dapp">
        <FormattedMessage id="DAPP" />
      </NavLink>
    </div>
  );

  const navBarEnd = (
    <div className="navbar-end">
      <div className="navbar-item">
        <InputSearch {...props} />
      </div>
    </div>
  );

  const isActiveClass = {
    "is-active": showMenu
  };

  return (
    <nav className="navbar" role="navigation">
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
