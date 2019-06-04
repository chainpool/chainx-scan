import React, { memo } from "react";
import classnames from "classnames";
import hexAddPrefix from "@polkadot/util/hex/addPrefix";

import { encodeAddress } from "../shared";

export default memo(function AddressLink(props) {
  const { value, className, style } = props;
  const hexValue = hexAddPrefix(value);
  let showValue = "";

  if (hexValue !== "0x") {
    showValue = encodeAddress(hexValue);
  }

  return (
    <div style={style} className={classnames(className)}>
      {showValue}
    </div>
  );
});
