import React, { useState } from "react";
import classnames from "classnames";
import { NavLink, withRouter } from "react-router-dom";
import { matchPath } from "react-router";
import { hexStripPrefix, hexAddPrefix } from "@polkadot/util";

import { fetch } from "../common";
import ChainxLogo from "../assets/chainxLogo.png";

function SearchInput(props) {
  const { history } = props;

  const [str, setStr] = useState("");

  async function search(input) {
    input = input.trim();
    if (!isNaN(input)) {
      history.push(`/blocks/${input}`);
      setStr("");
      return;
    }
    try {
      const txResult = await fetch(`/tx/${hexStripPrefix(input)}`);
      if (txResult && !txResult.error) {
        history.push(`/txs/${hexStripPrefix(input)}`);
      }
      const blockResult = await fetch(`/block/${hexAddPrefix(input)}`);
      if (blockResult && !blockResult.error) {
        history.push(`/blocks/${hexAddPrefix(input)}`);
      }
      setStr("");
      return;
    } catch {
      alert("无效的值");
    }
    alert("找不到对应的交易或区块");
  }

  return (
    <input
      value={str}
      onChange={e => setStr(e.target.value)}
      onKeyPress={event => {
        if (event.key === "Enter") {
          search(str);
        }
      }}
      style={{ minWidth: 350 }}
      className="input is-rounded"
      type="text"
      placeholder="搜索区块高度,区块哈希,交易哈希"
    />
  );
}

export default withRouter(function Header(props) {
  const { location } = props;
  const [showMenu, setShowMenu] = useState(false);

  const matchesArray = ["/txs", "/events"];

  const isMatchBlocks = matchesArray.some(path => !!matchPath(location.pathname, { path }));

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
        <SearchInput {...props} />
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
