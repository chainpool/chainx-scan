import React, { memo } from "react";
import { Number } from "../../components";

export default memo(function(props) {
  const { fill, total, precision } = props;

  const percent = (isNaN(fill / total) ? 0 : fill / total).toFixed(3) * 100;

  return (
    <span>
      <Number value={fill} precision={precision} />
      {`(${percent}%)`}
    </span>
  );
});
