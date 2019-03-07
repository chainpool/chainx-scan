import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import { encodeAddress } from "../common";

export default memo(function AddressLink(props) {
  const { value } = props;
  let address;
  try {
    address = encodeAddress(value);
  } catch {
    address = value;
  }
  return (
    <NavLink to={`/${value}`} className="nav-link">
      {address}
    </NavLink>
  );
});
