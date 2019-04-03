import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

import Number from "./Number";

export default function Link(props) {
  const { value, hexValue, parent, className, style } = props;

  return (
    <NavLink
      to={`/${parent}/${hexValue ? hexValue : value}`}
      style={style}
      className={classnames("nav-link", className)}
    >
      {/^0x[\da-fA-F]{64}$/.test(value) || typeof value == "string" ? value : <Number value={value} />}
    </NavLink>
  );
}
