import React from "react";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { CrossChainNav } from "../../components";
import CrossBlocks from "./CrossBlocks";
import classnames from "classnames";
import Bitcoin from "../../assets/crossblocks/bitcoin.jpg";
import Etherum from "../../assets/crossblocks/etherum.jpg";
import DepositMine from "../../assets/crossblocks/deposit_mine.jpg";
import CrossTxs from "./CrossTxs";
import CrossBind from "./CrossBind";

export default function CrossBlock(props) {
  const activeKey = props.location.pathname;
  return (
    <>
      <div className="tabs top">
        <ul>
          <li className={classnames({ "is-active": activeKey === "/crossblocks/depositMine" })}>
            <NavLink to="/crossblocks/depositMine">
              <img className="tab-img" src={DepositMine} alt="充值挖矿" />
              充值挖矿
            </NavLink>
          </li>
          <li className={classnames({ "is-active": activeKey.includes("/crossblocks/bitcoin") })}>
            <NavLink to="/crossblocks/bitcoin">
              <img className="tab-img" src={Bitcoin} alt="Bitcoin转接桥" />
              Bitcoin转接桥
            </NavLink>
          </li>
          <li className={classnames({ "is-active": activeKey === "/crossblocks/etherum" })}>
            <NavLink to="/crossblocks/etherum">
              <img className="tab-img" src={Etherum} alt="Etherum转接桥" />
              Etherum转接桥
            </NavLink>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path="/crossblocks/depositMine" render={props => <div />} />
        <Route
          path="/crossblocks/etherum"
          render={props => {
            return <div />;
          }}
        />
        <Route
          path="/crossblocks(/bitcoin)?(/:list)?"
          render={props => {
            return (
              <div className="box">
                <CrossChainNav activeKey={props.location.pathname} />
                {props.location.pathname === "/crossblocks/bitcoin" && <CrossBlocks {...props} />}
                {props.location.pathname === "/crossblocks/bitcoin/crosstxs" && <CrossTxs {...props} />}
                {props.location.pathname === "/crossblocks/bitcoin/crossbind" && <CrossBind {...props} />}
              </div>
            );
          }}
        />
      </Switch>
    </>
  );
}
