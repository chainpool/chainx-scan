import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { hexAddPrefix } from "@polkadot/util";

import { useAppContext } from "../App/Context";
import { encodeAddress } from "../common";

export default memo(function AddressLink(props) {
  const { value, className, style, isValidators } = props;
  const hexValue = hexAddPrefix(value);

  const [{ intentions }] = useAppContext();

  let showValue = "";

  if (hexValue !== "0x") {
    if (!isValidators) {
      showValue = encodeAddress(hexValue);
    } else {
      const { name = "" } = intentions.find(({ accountid }) => accountid === hexValue) || {};
      showValue = name;
    }
  }

  return (
    <NavLink to={`/${hexValue}`} style={style} className={classnames("nav-link", className)}>
      {showValue}
    </NavLink>
  );
});
