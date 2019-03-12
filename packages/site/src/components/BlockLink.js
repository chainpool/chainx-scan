import React from "react";
import classnames from "classnames";

import { NavLink } from "react-router-dom";

export default function BlockLink(props) {
  const { value, className, style } = props;

  return (
    <NavLink to={`/blocks/${value}`} style={style} className={classnames("nav-link", className)}>
      {value}
    </NavLink>
  );
}
