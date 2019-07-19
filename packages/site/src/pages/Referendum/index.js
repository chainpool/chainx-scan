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
                    <span className="r-title">公投规则：</span>{" "}
                    用户投票效力以投票账户的PCX总余额计数；公投过程中用户可随时更改投票意见，以最后一次投票为有效票；截至投票结束时，赞成票数大于反对票数即为提案通过，反之则提案未通过。
                    <span className="r-title">参与方式：</span>用户向以下指定地址
                    <span className="red">转账 0 PCX</span>表达对01号提案持赞成或反对意见;
                    <span className="r-title">公投结束时间：</span>块高
                    <span className="red">2640000</span>(预计时间 2019-07-26 12:23:29 );
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
                    <span className="r-title">公投规则：</span>{" "}
                    用户投票效力以投票账户的PCX总余额计数；公投过程中用户可随时更改投票意见，以最后一次投票为有效票；截至投票结束时，赞成票数大于反对票数即为提案通过，反之则提案未通过。
                    <span className="r-title">参与方式：</span>用户向以下指定地址
                    <span className="red">转账 0 PCX</span>表达对01号提案持赞成或反对意见;
                    <span className="r-title">公投结束时间：</span>块高
                    <span className="red">2640000</span>(预计时间 2019-07-26 12:23:29 );
                  </p>
                </div>
              }
            />
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
