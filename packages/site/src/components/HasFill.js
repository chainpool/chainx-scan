import React, { memo } from "react";
import { NumberFormat } from ".";

export default memo(function(props) {
  const { fill, total, precision } = props;

  return (
    <span>
      <NumberFormat value={fill} precision={precision} />
      (<NumberFormat value={fill / total} options={{ style: "percent", minimumFractionDigits: 1 }} />)
    </span>
  );
});
