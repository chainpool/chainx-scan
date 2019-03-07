import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

export default function BlockChain(props) {
  const { activeKey } = props;
  return (
    <div className="tabs">
      <ul>
        <li className={classnames({ "is-active": activeKey === "blocks" })}>
          <NavLink to="/blocks">区块列表</NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "txs" })}>
          <NavLink to="/txs">交易列表</NavLink>
        </li>
      </ul>
    </div>
  );
}
