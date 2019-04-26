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
import CrossHost from "./CrossHost";
import CrossDeposits from "./CrossDeposits";
import CrossWithdrawals from "./CrossWithdrawals";
import CrossClaim from "./CrossClaim";
import EtherumBind from "./EtherumBind";
import DepositsMine from "./DepositsMine";
import { FormattedMessage } from "react-intl";

export default function CrossBlock(props) {
  const activeKey = props.location.pathname;
  return (
    <>
      <div className="tabs top">
        <ul>
          <li className={classnames({ "is-active": activeKey === "/crossblocks/depositMine" })}>
            <NavLink to="/crossblocks/depositMine">
              <img className="tab-img" src={DepositMine} alt="充值挖矿" />
              <FormattedMessage id="DEPOSITSMINING" />
            </NavLink>
          </li>
          <li
            className={classnames({
              "is-active": activeKey.includes("/crossblocks/bitcoin") || activeKey === "/crossblocks"
            })}
          >
            <NavLink to="/crossblocks/bitcoin">
              <img className="tab-img" src={Bitcoin} alt="Bitcoin转接桥" />
              <FormattedMessage id="BTCBRIDGE" />
            </NavLink>
          </li>
          <li className={classnames({ "is-active": activeKey === "/crossblocks/etherum" })}>
            <NavLink to="/crossblocks/etherum">
              <img className="tab-img" src={Etherum} alt="Etherum转接桥" />
              <FormattedMessage id="ETHBRIDGE" />
            </NavLink>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path="/crossblocks/depositMine" render={props => <DepositsMine {...props} />} />
        <Route path="/crossblocks/etherum" render={props => <EtherumBind {...props} />} />
        <Route
          path="/crossblocks/:bitcoin?/:list?"
          render={props => {
            const {
              match: {
                params: { bitcoin, list }
              }
            } = props;
            return (
              <>
                {(!bitcoin || bitcoin === "bitcoin") && (
                  <div className="box">
                    <CrossChainNav activeKey={list} />
                    {(!list || list === "blocks") && <CrossBlocks {...props} />}
                    {list === "crosstxs" && <CrossTxs {...props} />}
                    {list === "crossbind" && <CrossBind {...props} />}
                    {list === "crosshost" && <CrossHost {...props} />}
                    {list === "deposits" && <CrossDeposits {...props} />}
                    {list === "withdrawals" && <CrossWithdrawals {...props} />}
                    {list === "claim" && <CrossClaim {...props} />}
                  </div>
                )}
              </>
            );
          }}
        />
      </Switch>
    </>
  );
}
