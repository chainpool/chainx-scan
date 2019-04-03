import React from "react";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { CrossChainNav } from "../../components";
import CrossBlocks from "./CrossBlocks";
import classnames from "classnames";
import Bitcoin from "../../assets/crossblocks/bitcoin.jpg";
import Etherum from "../../assets/crossblocks/etherum.jpg";
import DepositMine from "../../assets/crossblocks/deposit_mine.jpg";

export default function CrossBlock(props) {
  const activeKey = props.location.pathname;
  return (
    <>
      <div className="tabs">
        <ul>
          <li className={classnames({ "is-active": activeKey === "/crossblocks/depositMine" })}>
            <NavLink to="/crossblocks/depositMine">
              <img src={DepositMine} alt="充值挖矿" />
              充值挖矿
            </NavLink>
          </li>
          <li className={classnames({ "is-active": activeKey === "/crossblocks/bitcoin" })}>
            <NavLink to="/crossblocks/bitcoin">
              <img src={Bitcoin} alt="Bitcoin转接桥" />
              Bitcoin转接桥
            </NavLink>
          </li>
          <li className={classnames({ "is-active": activeKey === "/crossblocks/etherum" })}>
            <NavLink to="/crossblocks/etherum">
              <img src={Etherum} alt="Etherum转接桥" />
              Etherum转接桥
            </NavLink>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path="/crossblocks/depositMine" render={props => <div />} />
        <Route
          exact={false}
          path="/crossblocks/bitcoin"
          render={props => {
            return (
              <div className="box">
                <CrossChainNav activeKey={props.location.pathname} />
                <CrossBlocks {...props} />
              </div>
            );
          }}
        />
        <Route path="//crossblocksetherum" render={props => <div />} />
      </Switch>
    </>
  );
}
