import React, { memo } from "react";
import { NumberFormat } from ".";

export default memo(function(props) {
  const { fill, total, symbol } = props;
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

  const [{ tokens }] = useAppContext();
  let precision = 0;
  if (!tokens.length) return null;
  const findToken = tokens.find(token => token.token === symbol.toUpperCase());
  if (findToken) {
    precision = findToken.precision;
  }

  return (
    <span>
      <NumberFormat value={fill} precision={precision} />
      (<NumberFormat value={fill / total} options={{ style: "percent", minimumFractionDigits: 1 }} />)
    </span>
  );
});
