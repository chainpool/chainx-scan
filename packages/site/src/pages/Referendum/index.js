import React, { useEffect } from "react";
import { Route, Switch } from "react-router";

import { useRedux } from "../../shared";
import api from "../../services/api";
import Underway from "./Underway";
import { ReferendumNav } from "../../components";

export default function Referendum() {
  const [{ details }, setState] = useRedux(`referndum-detailss`, {
    details: []
  });

  useEffect(() => {
    api.fetchReferendumDetails$().subscribe(data => {
      setState({
        details: data
      });
    });
  }, [api]);

  return (
    <Switch>
      <Route
        path="/referendum/underway"
        render={props => (
          <div className="box">
            <ReferendumNav activeKey="underway" />
            {details
              .reverse()
              .filter(({ status }) => status === "1")
              .map(item => {
                return (
                  <div key={item.title}>
                    <Underway
                      {...props}
                      id={item.id}
                      title={item.title}
                      desc={
                        <div
                          className="referendum-detail"
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.6)", lineHeight: 1.8 }}
                        >
                          <p className="r-title">{item.desc}</p>
                          {item.reason && (
                            <p>
                              <span className="r-title">提案目的：</span>
                              {item.reason}
                            </p>
                          )}
                          <p>
                            <span className="r-title">公投规则：</span>
                            {item.rule ||
                              "1、用户投票效力以投票账户的PCX总余额计数；2、公投过程中用户可随时更改投票意见，以最后一次投票为有效票；3、截至投票结束时，赞成票数大于2/3即提案通过，反之则提案未通过。"}
                            <span className="r-title">参与方式：</span>用户向以下指定地址
                            <span className="red">转账 0 PCX</span>表达对本提案持赞成或反对意见。
                            <span className="r-title">公投结束时间：</span>块高
                            <span className="red">{item.deadBlock}</span>(预计时间 {item.deadTime})。
                          </p>
                        </div>
                      }
                    />
                    <hr />
                  </div>
                );
              })}
          </div>
        )}
      />
      <Route
        path="/referendum/finished"
        render={props => (
          <div className="box">
            <ReferendumNav activeKey="finished" />
            {details
              .reverse()
              .filter(({ status }) => status === "2")
              .map(item => {
                return (
                  <div key={item.title}>
                    <Underway
                      {...props}
                      id={item.id}
                      title={item.title}
                      desc={
                        <div
                          className="referendum-detail"
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.6)", lineHeight: 1.8 }}
                        >
                          <p className="r-title">{item.desc}</p>
                          {item.reason && (
                            <p>
                              <span className="r-title">提案目的：</span>
                              {item.reason}
                            </p>
                          )}
                          <p>
                            <span className="r-title">公投规则：</span>
                            {item.rule ||
                              "1、用户投票效力以投票账户的PCX总余额计数；2、公投过程中用户可随时更改投票意见，以最后一次投票为有效票；3、截至投票结束时，赞成票数大于2/3即提案通过，反之则提案未通过。"}
                            <span className="r-title">参与方式：</span>用户向以下指定地址
                            <span className="red">转账 0 PCX</span>表达对本提案持赞成或反对意见。
                            <span className="r-title">公投结束时间：</span>块高
                            <span className="red">{item.deadBlock}</span>(预计时间 {item.deadTime})。
                          </p>
                        </div>
                      }
                    />
                    <hr />
                  </div>
                );
              })}
          </div>
        )}
      />
    </Switch>
  );
}
