import React, { useEffect } from "react";
import { Route, Switch } from "react-router";

import { useRedux } from "../../shared";
import api from "../../services/api";
import Underway from "./Underway";
import { ReferendumNav } from "../../components";
import zhReferendum from "./referendum.zh.json";
import enReferendum from "./referendum.en";
import dayjs from "dayjs";
import { injectIntl } from "react-intl";

function Referendum({ intl: { locale }, intl }) {
  const referendum = locale.startsWith("en") ? enReferendum : zhReferendum;
  referendum.sort((a, b) => b.id - a.id);

  const [{ details }, setState] = useRedux(`referndum-detailss`, {
    details: referendum || []
  });

  useEffect(() => {
    api.fetchLatestBlock$().subscribe(block => {
      const currentTime = dayjs(block.time);

      const details = (referendum || []).map(detail => ({
        ...detail,
        deadTime: currentTime.add((+detail.deadBlock - block.number) * 2, "s").format("YYYY-MM-DD HH:mm:ss")
      }));

      setState({
        details
      });
    });
  }, [api, referendum]);

  console.log(details);

  return (
    <Switch>
      <Route
        path="/referendum/underway"
        render={props => (
          <div className="box">
            <ReferendumNav activeKey="underway" />
            {details
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
                              <span className="r-title">{intl.messages.REFERENDUM_PURPOSE}：</span>
                              {item.reason}
                            </p>
                          )}
                          <p>
                            <span className="r-title">{intl.messages.REFERENDUM_RULE}：</span>
                            {item.rule || intl.messages.REFERENDUM_COMMON_RULE}
                            <span className="r-title">{intl.messages.REFERENDUM_PARTICIPATION}：</span>
                            {intl.messages.REFERENDUM_USER_TRANSFER}
                            <span className="red">{intl.messages.REFERENDUM_ZERO_PCX}</span>
                            {intl.messages.REFERENDUM_SHOW_AGAINST}
                            <span className="r-title">{intl.messages.REFERENDUM_FINISHED_TIME}：</span>
                            {intl.messages.REFERENDUM_BLOCK_HEIGHT}
                            <span className="red">{item.deadBlock}</span>({intl.messages.REFERENDUM_ESTIMATED_TIME}{" "}
                            {item.deadTime})。
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
                              <span className="r-title">{intl.messages.REFERENDUM_PURPOSE}：</span>
                              {item.reason}
                            </p>
                          )}
                          <p>
                            <span className="r-title">{intl.messages.REFERENDUM_RULE}：</span>
                            {item.rule || intl.messages.REFERENDUM_COMMON_RULE}
                            <span className="r-title">{intl.messages.REFERENDUM_PARTICIPATION}：</span>
                            {intl.messages.REFERENDUM_USER_TRANSFER}
                            <span className="red">{intl.messages.REFERENDUM_ZERO_PCX}</span>
                            {intl.messages.REFERENDUM_SHOW_AGAINST}
                            <span className="r-title">{intl.messages.REFERENDUM_FINISHED_TIME}：</span>
                            {intl.messages.REFERENDUM_BLOCK_HEIGHT}
                            <span className="red">{item.deadBlock}</span>({intl.messages.REFERENDUM_ESTIMATED_TIME}{" "}
                            {item.deadTime})。
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

export default injectIntl(Referendum);
