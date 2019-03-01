import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import ChainxLogo from '../assets/chainx-logo.png';

class Header extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };
  }

  render() {
    const navBarStart = (
      <div className="navbar-start">
        <NavLink className="navbar-item" to="/">
          首页
        </NavLink>
        <NavLink className="navbar-item" to="/block">
          区块链
        </NavLink>
        <NavLink className="navbar-item" to="/">
          验证人
        </NavLink>
        <NavLink className="navbar-item" to="/">
          跨链轻节点
        </NavLink>
        <NavLink className="navbar-item" to="/">
          DAPP
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
      'is-active': this.state.showMenu,
    };

    return (
      <nav className="navbar is-black" role="navigation">
        <div className="container ">
          <div className="navbar-brand">
            <NavLink to="/" className="navbar-item" activeClassName="selected">
              <img src={ChainxLogo} alt="chainx" width="112" height="28" />
            </NavLink>
            <a
              role="button"
              className={classnames('navbar-burger burger', isActiveClass)}
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div className={classnames('navbar-menu', isActiveClass)}>
            {navBarStart}
            {navBarEnd}
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
