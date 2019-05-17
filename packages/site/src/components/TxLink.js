import React, { memo } from "react";
import classnames from "classnames";

import hexAddPrefix from "@polkadot/util/hex/addPrefix";
import { NavLink } from "react-router-dom";

export default memo(function TxLink(props) {
  const { value, className, style } = props;

  if (!value) return null;

  const hash = hexAddPrefix(value);

  return (
    <NavLink to={`/txs/${hash}`} className={classnames("nav-link", className)} style={style}>
      {hash}
    </NavLink>
  );
});
