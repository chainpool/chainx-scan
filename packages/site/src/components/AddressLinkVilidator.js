import React from "react";

import { hexAddPrefix } from "@polkadot/util";
import { Link } from "./index.js";

export default function AddressLinkVilidator({ value = "", hexValue = "" }) {
  hexValue = hexAddPrefix(hexValue);
  value = value === null ? "" : value;
  return (
    <span className="nowrap">
      <Link parent="validators" hexValue={hexValue} value={value} />
    </span>
  );
}
