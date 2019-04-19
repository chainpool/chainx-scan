import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

export default function BlockChain(props) {
  const { activeKey = "blocks", className, style } = props;
  return (
    <div className={classnames("tabs", className)} style={style}>
      <ul>
        <li className={classnames({ "is-active": activeKey === "blocks" })}>
          <NavLink to="/crossblocks/bitcoin/blocks">区块列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "crosstxs" })}>
          <NavLink to="/crossblocks/bitcoin/crosstxs">交易列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "crossbind" })}>
          <NavLink to="/crossblocks/bitcoin/crossbind">地址绑定列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "deposits" })}>
          <NavLink to="/crossblocks/bitcoin/deposits">充值列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "withdrawals" })}>
          <NavLink to="/crossblocks/bitcoin/withdrawals">提现列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "crosshost" })}>
          <NavLink to="/crossblocks/bitcoin/crosshost">托管地址列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "claim" })}>
          <NavLink to="/crossblocks/bitcoin/claim">充值未认领列表</NavLink>
        </li>
      </ul>
    </div>
  );
}
