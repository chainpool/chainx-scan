import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

export default function BlockChain(props) {
  const { activeKey, className, style } = props;
  return (
    <div className={classnames("tabs", className)} style={style}>
      <ul>
        <li
          className={classnames({ "is-active": activeKey === "/crossblocks/bitcoin" || activeKey === "/crossblocks" })}
        >
          <NavLink to="/crossblocks/bitcoin">区块列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "/crossblocks/bitcoin/crosstxs" })}>
          <NavLink to="/crossblocks/bitcoin/crosstxs">交易列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "/crossblocks/bitcoin/crossbind" })}>
          <NavLink to="/crossblocks/bitcoin/crossbind">地址绑定列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "/crossblocks/bitcoin/deposits" })}>
          <NavLink to="/crossblocks/bitcoin/deposits">充值列表</NavLink>
        </li>
      </ul>
    </div>
  );
}
