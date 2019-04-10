import React from "react";

import { hexAddPrefix } from "@polkadot/util";
import { useAppContext } from "./AppContext";
import { Link } from "./index.js";

export default function VilidatorLink({ value, name = "", isActive = true }) {
  const hexValue = hexAddPrefix(value);
  if (name === "") {
    const [{ intentions = [] }] = useAppContext();
    const intention = intentions.find(({ accountid }) => accountid === hexValue) || { name: "" };
    name = intention.name;
  } else if (name === null) {
    name = "";
  }
  return (
    <span className="nowrap">
      <Link parent="validators" hexValue={hexValue} value={name} />
      {!isActive && <span className="table-tag-nagtive">(已退选)</span>}
    </span>
  );
}
