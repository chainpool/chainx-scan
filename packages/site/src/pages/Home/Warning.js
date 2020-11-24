import React from "react";
import { Alert } from "antd";
import "antd/dist/antd.css";

function Warning() {
  const url = (
    <div>
      <span>
        ChainX主网已更新至2.0版本，请前往<a href="https://scan-v2.chainx.org/">这里</a>
        体验2.0浏览器。1.0浏览器功能已全部停止，此网页将在12月15日后失效。因此给您带来的不便敬请谅解。
      </span>
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
