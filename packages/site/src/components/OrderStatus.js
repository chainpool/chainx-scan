import React, { memo } from "react";
import { injectIntl } from "react-intl";

export default injectIntl(
  memo(function OrderStatus(props) {
    const {
      value,
      intl: { messages }
    } = props;
    if (!value || typeof value !== "string") return "";

    const text = messages.Status[value] || value;

    return <div>{text}</div>;
  })
);
