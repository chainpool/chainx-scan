import React, { memo } from "react";

const Status = {
  ZeroFill: "未成交",
  ParitialFill: "部分成交",
  Filled: "全部成交",
  ParitialFillAndCanceled: "部分成交已取消",
  Canceled: "已取消"
};

export default memo(function OrderStatus(props) {
  const { value } = props;
  if (!value || typeof value !== "string") return "";

  const text = Status[value] || value;

  return <div>{text}</div>;
});
