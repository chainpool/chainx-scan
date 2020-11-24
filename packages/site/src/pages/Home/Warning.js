import React from "react";
import { Alert } from "antd";
import "antd/dist/antd.css";

function Warning() {
  const url = (
    <div>
      <span>{"1.0浏览器已暂停使用，请大家转移至2.0浏览器，新浏览器入口："}</span>
      <a href="https://scan-v2.chainx.org/">{"点这里"}</a>
    </div>
  );
  return (
    <div style={{ marginBottom: "10px" }}>
      <Alert
        message="Warning"
        description={url}
        type="error"
        showIcon
        closable
        banner
        onClose={() => (window.location.href = "https://scan-v2.chainx.org/")}
      />
    </div>
  );
}

export default Warning;
