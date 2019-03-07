import React, { memo } from "react";

import { hexAddPrefix } from "@polkadot/util";
import { NavLink } from "react-router-dom";

export default memo(function TxLink(props) {
  const { value } = props;
  const hash = hexAddPrefix(value);
  return (
    <NavLink to={`/${value}`} className="nav-link">
      {hash}
    </NavLink>
  );
});
