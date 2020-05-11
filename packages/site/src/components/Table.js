import React from "react";
import AntdTable from "antd/lib/table";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import en_US from "antd/lib/locale-provider/en_US";
import useRedux from "../shared/useRedux";
import { injectIntl } from "react-intl";

export default injectIntl(function Table({ intl: { messages }, ..._props }) {
  const [{ local }] = useRedux("locale");
  const props = {
    size: "small",
    ..._props
  };
  const pagination = _props.pagination
    ? {
        size: "small",
        showQuickJumper: true,
        itemRender: (current, type, originalElement) => {
          if (type === "prev") {
            return <a className="btn-border">{messages.OTHERS.PRE}</a>;
          }
          if (type === "jump-prev") {
            return <span onClick={e => e.stopPropagation()}>...</span>;
          }
          if (type === "next") {
            return <a className="btn-border">{messages.OTHERS.NEXT}</a>;
          }
          if (type === "jump-next") {
            return <span onClick={e => e.stopPropagation()}>...</span>;
          }
          return originalElement;
        },
        showTotal: (total, range) => (
          <span className="nagtive">
            {messages.OTHERS.TOTAL} {total} {messages.OTHERS.UNIT}
          </span>
        ),
        ..._props.pagination
      }
    : false;
  return (
    <ConfigProvider locale={local === "zh-CN" ? zh_CN : en_US}>
      <AntdTable
        {...props}
        bordered={false}
        rowClassName={(record, index) => (index % 2 === 0 ? "smoke" : "")}
        pagination={pagination}
      />
    </ConfigProvider>
  );
});
