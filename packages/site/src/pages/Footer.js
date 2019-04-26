import React, { useState } from "react";

import weixin from "../assets/weixin.jpg";
import Icon from "antd/lib/icon";
import classnames from "classnames";

export const LangChanger = function() {
  const languages = ["中文", "English"];
  const [language, setLanguage] = useState(languages[0]);
  const [active, setActive] = useState(false);
  const handleChange = language => {
    setLanguage(language);
    setActive(false);
  };
  return (
    <div className="lang-selector">
      <div className="show-lang" onClick={() => setActive(true)}>
        {language} <Icon type="up" />
      </div>
      <ul className={classnames("selector", { active })}>
        {languages.map(item => (
          <li
            className={classnames("select-item", { active: item === language })}
            onClick={() => handleChange(item)}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Footer() {
  return (
    <div className="page-footer">
      <div className="container">
        <ul className="footer-start">
          <li>
            <a href="https://chainx.org" target="_blank" rel="noopener noreferrer">
              ChainX 官网
            </a>
          </li>
          <li>
            <a href="https://wallet.chainx.org" target="_blank" rel="noopener noreferrer">
              钱包
            </a>
          </li>
          <li>
            <a href="https://twitter.com/chainx_org" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://github.com/chainx-org/ChainX" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </li>
          <li>
            <a href="https://t.me/chainx_org" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </li>
          <li className="chainx-code-wrapper">
            WeChat
            <div className="chainx-code">
              <img src={weixin} alt="" />
            </div>
          </li>
          <li>
            <a href="mailto:hi@chainx.org">hi@chainx.org</a>
          </li>
        </ul>
        <div className="footer-end">
          <LangChanger />
          Copyright © 2019 ChainX
        </div>
      </div>
    </div>
  );
}
