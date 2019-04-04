import React, { memo } from "react";
import classnames from "classnames";

export default memo(function TxLink(props) {
  const { value, className, style } = props;

  if (!value) return null;

  return (
    <a
      className={classnames("nav-link", className)}
      href={`//etherscan.io/address/${value}`}
      style={style}
      target="_blank"
      rel="noopener noreferrer"
    >
      {value}
    </a>
  );
});
