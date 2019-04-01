import React from "react";

export default function IndexExtend(props) {
  const { index, trust } = props;

  return (
    <span>
      {index}
      {!!trust && trust.length <= 0 ? "" : <span className="table-tag-trust">信托</span>}
    </span>
  );
}
