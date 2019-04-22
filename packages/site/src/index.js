import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import "./index.scss";
import App from "./pages/App";
//引入locale配置文件，具体路径根据实际情况填写
import zh_CN from "./i18n/zh_CN";
import en_US from "./i18n/en-US";
//如果浏览器没有自带intl，则需要在使用npm安装intl之后添加如下代码
import { IntlProvider } from "react-intl";
const local = navigator.language;
const i18n = {
  zh_CN,
  en_US
};

ReactDOM.render(
  <IntlProvider locale={local} messages={i18n[local]}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);
