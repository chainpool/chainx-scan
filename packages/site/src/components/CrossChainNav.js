import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { FormattedMessage } from "react-intl";

export default function BlockChain(props) {
  const { activeKey = "blocks", className, style } = props;
  return (
    <div className={classnames("tabs", className)} style={style}>
      <ul>
        <li className={classnames({ "is-active": activeKey === "blocks" })}>
          <NavLink to="/crossblocks/bitcoin/blocks">
            <FormattedMessage id="BLOCKS" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "crosstxs" })}>
          <NavLink to="/crossblocks/bitcoin/crosstxs">
            <FormattedMessage id="EXTRINSICS" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "crossbind" })}>
          <NavLink to="/crossblocks/bitcoin/crossbind">
            <FormattedMessage id="BINDEDADDRESSES" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "deposits" })}>
          <NavLink to="/crossblocks/bitcoin/deposits">
            <FormattedMessage id="DEPOSITELIST" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "withdrawals" })}>
          <NavLink to="/crossblocks/bitcoin/withdrawals">
            <FormattedMessage id="WITHDRAWALS" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "crosshost" })}>
          <NavLink to="/crossblocks/bitcoin/crosshost">
            <FormattedMessage id="TRUSTEEADDRESSES" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "claim" })}>
          <NavLink to="/crossblocks/bitcoin/claim">
            <FormattedMessage id="UNCLAIMEDDEPOSITS" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
