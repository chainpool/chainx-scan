import React from "react";

import weixin from "../assets/weixin.jpg";
import { FormattedMessage } from "react-intl";

export default function Footer() {
  return (
    <div className="page-footer">
      <div className="container">
        <ul className="footer-start">
          <li>
            <a href="https://chainx.org" target="_blank" rel="noopener noreferrer">
              ChainX <FormattedMessage id="HOME" />
            </a>
          </li>
          <li>
            <a href="https://wallet.chainx.org" target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="WALLET" />
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
        <div className="footer-end">Copyright © 2019 ChainX</div>
      </div>
    </div>
  );
}
