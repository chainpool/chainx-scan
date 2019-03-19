import React, { memo } from "react";

const DIRECTION = {
  SELL: "卖出",
  BUY: "买入"
};

export default memo(function OrderDirection(props) {
  const { value } = props;
  if (!value || typeof value !== "string") return "";

  const text = DIRECTION[value.toUpperCase()] || "";

  return <div>{text}</div>;
});
