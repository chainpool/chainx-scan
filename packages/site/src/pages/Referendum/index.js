import React from "react";
import { Route, Switch } from "react-router";

import Underway from "./Underway";
import Finished from "./Finished";
import { ReferendumNav } from "../../components";

export default function Referendum() {
  return (
    <Switch>
      <Route
        path="/referendum/underway"
        render={props => (
          <div className="box">
            <ReferendumNav activeKey="underway" />
            <Underway
              {...props}
              id="1"
              title="01号提案: 加强节点自抵押限制"
              desc={
                <div
                  className="referendum-detail"
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.6)", lineHeight: 1.8 }}
                >
                  <p className="r-title">
                    本提案提议节点最多只能接受 10
                    倍于自抵押的总得票。即当用户对某节点投票时，如果投票后节点的总得票数大于该节点自抵押的10倍，则该投票动作失败，需等待节点增加自抵押扩大该节点的用户投票上限。如：A节点当前的自抵押票数为1000PCX，得票总数为9000PCX(包含用户投票为8000PCX)，此时A节点最多可再接受用户投1000PCX，若B用户试图投票给A节点1200PCX，则投票失败。
                  </p>
                  <p>
                    <span className="r-title">提案目的：</span>
                    1、将节点运营方的利益和该节点的收益捆绑，为日后更加严格的双签等作恶惩罚机制奠定基础；2、增强社区用户对节点的信心，促进ChainX生态的可持续发展。
                  </p>
                  <p>
                    <span className="r-title">公投规则：</span>{" "}
                    1、用户投票效力以投票账户的PCX总余额计数；2、公投过程中用户可随时更改投票意见，以最后一次投票为有效票；3、截至投票结束时，赞成票数大于反对票数即为提案通过，反之则提案未通过。
                    <span className="r-title">参与方式：</span>用户向以下指定地址
                    <span className="red">转账 0 PCX</span>表达对本提案持赞成或反对意见。
                    <span className="r-title">公投结束时间：</span>块高
                    <span className="red">2640000</span>(预计时间 2019-07-26 12:23:29 )。
                  </p>
                </div>
              }
            />
            <hr />
            <Underway
              {...props}
              id="2"
              title="02号提案：限制用户频繁切换投票"
              desc={
                <div
                  className="referendum-detail"
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.6)", lineHeight: 1.8 }}
                >
                  <p className="r-title">
                    当前用户撤票锁定期为3天，本提案提议以撤票锁定期为基准，投票用户切换投票限制期也为3天，即用户3天内只能有一次切换投票的机会。当投票用户再次切换投票时，必须距离上次切换时间超过3天，否则再次切换失败。
                  </p>
                  <p>
                    <span className="r-title">提案目的：</span>
                    在保证用户切换节点选择权的同时，增强社区用户对节点的忠诚度。
                  </p>
                  <p>
                    <span className="r-title">公投规则：</span>{" "}
                    1、用户投票效力以投票账户的PCX总余额计数；2、公投过程中用户可随时更改投票意见，以最后一次投票为有效票；3、截至投票结束时，赞成票数大于反对票数即为提案通过，反之则提案未通过。
                    <span className="r-title">参与方式：</span>用户向以下指定地址
                    <span className="red">转账 0 PCX</span>表达对本提案持赞成或反对意见。
                    <span className="r-title">公投结束时间：</span>块高
                    <span className="red">2640000</span>(预计时间 2019-07-26 12:23:29 )。
                  </p>
                </div>
              }
            />
            <hr />
            {/* <Underway
              {...props}
              id="3"
              title="03号提案：支出议会基金上币MXC抹茶交易所"
              desc={
                <div
                  className="referendum-detail"
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.6)", lineHeight: 1.8 }}
                >
                  <p className="r-title">
                    节点Nodeasy.com发起提案：议会基金支出2000个PCX，用于MXC抹茶交易所上币，目前议会基金总量为3000个PCX左右。其中1000PCX为技术对接服务费，另外1000PCX为活动奖励经费。同时需要在48小时内，超过2000个账户完成在抹茶交易所的PCX充值操作，可以从ChainX链发起向抹茶系统充值，或抹茶账户之间转账。
                    如果议案通过后，双方会进行技术对接，并商定具体的充值上币时间段，具体交易开放时间，具体活动奖励细则。
                  </p>
                  <p>
                    <span className="r-title">公投规则：</span>{" "}
                    1、用户投票效力以投票账户的PCX总余额计数；2、公投过程中用户可随时更改投票意见，以最后一次投票为有效票；3、截至投票结束时，赞成票数大于反对票数即为提案通过，反之则提案未通过。
                    <span className="r-title">参与方式：</span>用户向以下指定地址
                    <span className="red">转账 0 PCX</span>表达对本提案持赞成或反对意见。
                    <span className="r-title">公投结束时间：</span>块高
                    <span className="red">2520000</span>(预计时间 2019-07-23 17:56:51 )。
                  </p>
                </div>
              }
            /> */}
          </div>
        )}
      />
      <Route
        path="/referendum/finished"
        render={props => (
          <div className="box">
            <ReferendumNav activeKey="finished" />
            <Finished {...props} />
          </div>
        )}
      />
    </Switch>
  );
}
