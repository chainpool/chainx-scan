import React, { memo } from "react";
import { Number } from ".";

export default memo(function(props) {
  const { fill, total, precision } = props;

  return (
    <span>
      <Number value={fill} precision={precision} />
      (<Number value={fill / total} options={{ style: "percent", minimumFractionDigits: 1 }} />)
    </span>
  );
});
