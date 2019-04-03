import React from "react";

import { hexAddPrefix } from "@polkadot/util";
import { useAppContext } from "./AppContext";
import { Link } from "./index.js";

export default function AddressLinkExtend({ value, isActive = true }) {
  const hexValue = hexAddPrefix(value);
  const [{ intentions = [] }] = useAppContext();
  const { name = "" } = intentions.find(({ accountid }) => accountid === hexValue) || {};
  value = name;
  return (
    <span className="nowrap">
      <Link parent="validators" hexValue={hexValue} value={value} />
      {!isActive && <span className="table-tag-nagtive">(已退选)</span>}
    </span>
  );
}
