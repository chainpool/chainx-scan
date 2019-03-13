import React from "react";
import AntdTable from "antd/lib/table";

export default function Table(_props) {
  const props = {
    size: "small",
    ..._props
  };
  return (
    <AntdTable
      {...props}
      pagination={{
        size: "small",
        showQuickJumper: true,
        showTotal: (total, range) => (
          <span>
            {range[0]}-{range[1]} of {total}
          </span>
        ),
        ..._props.pagination
      }}
    />
  );
}
