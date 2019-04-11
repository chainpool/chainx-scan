import { memo } from "react";

export default memo(function ToNumber(props) {
  const { value, options } = props;
  if (isNaN(value)) return "";

  const no = Number(value);

  return no.toLocaleString(undefined, {
    useGrouping: true,
    ...options
  });
});
