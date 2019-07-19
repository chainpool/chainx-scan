import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { FormattedMessage } from "react-intl";

export default function ReferendumNav(props) {
  const { activeKey, className, style } = props;
  return (
    <div className={classnames("tabs", className)} style={style}>
      <ul>
        <li className={classnames({ "is-active": activeKey === "underway" })}>
          <NavLink to="/referendum/underway">
            <FormattedMessage id="underwaytab" />
          </NavLink>
        </li>
        <li className={classnames({ "is-active": activeKey === "finished" })}>
          <NavLink to="/referendum/finished">
            <FormattedMessage id="finishedtab" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
