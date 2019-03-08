import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import { encodeAddress } from "../common";

export default memo(function AddressLink(props) {
  const { value, className, style } = props;
  let address;
  try {
    address = encodeAddress(value);
  } catch {
    address = value;
  }
  return (
    <NavLink to={`/${value}`} style={style} className={classnames("nav-link", className)}>
      {address}
    </NavLink>
  );
});
