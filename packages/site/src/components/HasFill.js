import React, { memo } from "react";
import { Number } from ".";

export default memo(function(props) {
  const { fill, total, precision } = props;
  const toFixed = (num, perc) => {
    if (typeof num !== "number") return num;
    num = num.toString().split(".");
    if (!num[1] || num[1].length < perc) {
      num[1] = num[1] || "";
      num[1] += new Array(perc + 1).join("0");
    } else {
      num[1] = num[1].substr(0, perc);
    }
    return num.join(".");
  };
  const number = isNaN(fill / total) ? 0 : fill / total;
  const percent = toFixed(number * 100, 1);

  return (
    <span>
      <Number value={fill} precision={precision} />
      {`(${percent}%)`}
    </span>
  );
});
