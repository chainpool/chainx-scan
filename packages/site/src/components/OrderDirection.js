import React, { memo } from "react";

import { injectIntl } from "react-intl";

const colorMap = {
  SELL: "#EA754B",
  BUY: "#34C69A"
};

export default injectIntl(
  memo(function OrderDirection(props) {
    const {
      value,
      intl: { messages }
    } = props;
    if (!value || typeof value !== "string") return "";

    const text = messages.DIRECTION[value.toUpperCase()] || value;

    return <div style={{ color: colorMap[value.toUpperCase()] }}>{text}</div>;
  })
);
