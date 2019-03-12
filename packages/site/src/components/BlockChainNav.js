import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

export default function BlockChain(props) {
  const { activeKey, className, style } = props;
  return (
    <div className={classnames("tabs", className)} style={style}>
      <ul>
        <li className={classnames({ "is-active": activeKey === "blocks" })}>
          <NavLink to="/blocks">区块列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "txs" })}>
          <NavLink to="/txs">交易列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "events" })}>
          <NavLink to="/events">事件列表</NavLink>
        </li>
      </ul>
    </div>
  );
}
