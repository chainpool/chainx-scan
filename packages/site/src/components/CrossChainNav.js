import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

export default function BlockChain(props) {
  const { activeKey, className, style } = props;
  return (
    <div className={classnames("tabs", className)} style={style}>
      <ul>
        <li className={classnames({ "is-active": activeKey === "crossblocks" })}>
          <NavLink to="/crossblocks">区块列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "crosstxs" })}>
          <NavLink to="/crosstxs">交易列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "crossbind" })}>
          <NavLink to="/crossbind">地址绑定列表</NavLink>
        </li>
      </ul>
    </div>
  );
}
