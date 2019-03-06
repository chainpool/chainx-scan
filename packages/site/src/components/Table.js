import React from "react";
import { Table as AntdTable } from "antd";

export default function Table(_props) {
  const props = {
    pagination: {
      size: "small",
      showSizeChanger: true,
      showQuickJumper: true,
      ..._props.pagination
    },
    size: "small",
    ..._props
  };
  return <AntdTable {...props} />;
}
