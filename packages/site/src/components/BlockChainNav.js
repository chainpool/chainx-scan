import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { FormattedMessage } from "react-intl";

export default function BlockChain(props) {
  const { activeKey, className, style } = props;
  return (
    <div className={classnames("tabs", className)} style={style}>
      <ul>
        <li className={classnames({ "is-active": activeKey === "blocks" })}>
          <NavLink to="/blocks">
            <FormattedMessage id="BLOCKS" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "txs" })}>
          <NavLink to="/txs">
            <FormattedMessage id="EXTRINSICS" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "events" })}>
          <NavLink to="/events">
            <FormattedMessage id="EVENTS" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "accounts" })}>
          <NavLink to="/accounts">
            <FormattedMessage id="ACCOUNTS" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
