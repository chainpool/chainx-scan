import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import Blocks from "./BlocksList";
import Txs from "../Txs/Txs";

const BlockChain = function BlockChain(props) {
  const { location } = props;

  const navs = [
    {
      key: "blocks",
      name: "区块列表",
      path: "/blockchain/blocks",
      component: Blocks
    },
    {
      key: "txs",
      name: "交易列表",
      path: "/blockchain/txs",
      component: Txs
    }
  ];

  return (
    <div className="box">
      <div className="tabs">
        <ul>
          {navs.map(({ key, path, name }) => (
            <li
              key={key}
              className={classnames({
                "is-active": location.pathname === path
              })}
            >
              <NavLink to={path}>{name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Switch>
          <Route key={key} path={path} component={component} />
          <Redirect from="/blockchain" exact to={navs[0].path} />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(BlockChain);
