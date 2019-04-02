import React, { memo } from "react";

const DIRECTION = {
  SELL: "卖出",
  BUY: "买入"
};

const colorMap = {
  SELL: "#EA754B",
  BUY: "#34C69A"
};

export default memo(function OrderDirection(props) {
  const { value } = props;
  if (!value || typeof value !== "string") return "";

  const text = DIRECTION[value.toUpperCase()] || value;

  return <div style={{ color: colorMap[value.toUpperCase()] }}>{text}</div>;
});
