import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import hexAddPrefix from "@polkadot/util/hex/hasPrefix";
import { useAppContext } from "./AppContext";
import { FormattedMessage } from "react-intl";

export default function VilidatorLink({
  value,
  name = false,
  isActive = true,
  style,
  index = "",
  className,
  filter = "detail"
}) {
  const hexValue = hexAddPrefix(value);
  if (name === null) {
    name = "";
  } else if (!name) {
    const [{ intentions = [] }] = useAppContext();
    const intention = intentions.find(({ accountid }) => accountid === hexValue) || { name: "" };
    name = intention.name;
  }
  return (
    <span className="nowrap">
      <NavLink to={`/validators/${filter}/${hexValue}`} style={style} className={classnames("nav-link", className)}>
        {name}
      </NavLink>
      {!isActive && (
        <span className="table-tag-nagtive">
          (<FormattedMessage id="INACTIVE" />)
        </span>
      )}
    </span>
  );
}
