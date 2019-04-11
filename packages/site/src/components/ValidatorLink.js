import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import { hexAddPrefix } from "@polkadot/util";
import { useAppContext } from "./AppContext";

export default function VilidatorLink({ value, name = false, isActive = true, style, className }) {
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
      <NavLink to={`/validators/${hexValue}`} style={style} className={classnames("nav-link", className)}>
        {name}
      </NavLink>
      {!isActive && <span className="table-tag-nagtive">(已退选)</span>}
    </span>
  );
}
