import { memo } from "react";

export default memo(function Number(props) {
  const { value, useGrouping = true, precision = 0 } = props;
  if (isNaN(value)) return "";
  const options = {
    useGrouping
  };

  const no = value / Math.pow(10, precision);

  if (precision) {
    options.minimumFractionDigits = precision;
  }

  return no.toLocaleString(undefined, options);
});
