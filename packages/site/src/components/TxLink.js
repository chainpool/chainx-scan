import React, { memo } from "react";
import classnames from "classnames";

import { hexAddPrefix } from "@polkadot/util";
import { NavLink } from "react-router-dom";

export default memo(function TxLink(props) {
  const { value, className, style } = props;
  const hash = hexAddPrefix(value);

  return (
    <NavLink to={`/txs/${value}`} className={classnames("nav-link", className)} style={style}>
      {hash}
    </NavLink>
  );
});
