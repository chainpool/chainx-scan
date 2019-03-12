import React from "react";
import AntdTable from "antd/lib/table";

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
