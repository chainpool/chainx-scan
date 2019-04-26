import React, { memo } from "react";

import { injectIntl } from "react-intl";

export default injectIntl(
  memo(function OrderDirection(props) {
    const {
      value,
      intl: { messages }
    } = props;
    if (!value || typeof value !== "string") return "";

    const text = messages.DIRECTION[value.toUpperCase()] || value;

    return <div>{text}</div>;
  })
);
