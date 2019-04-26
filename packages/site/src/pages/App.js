import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { AppContextProvider } from "../components/AppContext";
//引入locale配置文件，具体路径根据实际情况填写
import zh_CN from "../i18n/zh_CN";
import en_US from "../i18n/en-US";
//如果浏览器没有自带intl，则需要在使用npm安装intl之后添加如下代码
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
import { useRedux } from "../shared";
const locale = localStorage.getItem("locale");
const i18n = {
  zh: zh_CN,
  en: en_US
};
addLocaleData([...en, ...zh]); // 引入多语言环境的数据

export default function App() {
  const [{ local }] = useRedux("locale", { local: locale || navigator.language });
  console.log(local);
  return (
    <IntlProvider locale={local} messages={i18n[local.split("-")[0]]}>
      <Router>
        <React.Fragment>
          <Header />
          <AppContextProvider>
            <Main />
          </AppContextProvider>
          <Footer />
        </React.Fragment>
      </Router>
    </IntlProvider>
  );
}
