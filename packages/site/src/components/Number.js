import { memo } from "react";

export default memo(function Number(props) {
  const { value, useGrouping = true } = props;
  if (isNaN(value)) return "";
  const options = {
    useGrouping
  };

  return value.toLocaleString(undefined, options);
});
