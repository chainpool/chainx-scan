import React, { useEffect } from "react";
import { Route, Switch } from "react-router";

import { useRedux } from "../../shared";
import api from "../../services/api";
import Underway from "./Underway";
import Finished from "./Finished";
import { ReferendumNav } from "../../components";
import { injectIntl } from "react-intl";

function Referendum({ intl: { locale }, intl }) {
  const lang = locale.startsWith("en") ? "en" : "zh";

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
              .filter(({ isFinished }) => !isFinished)
              .map(item => {
                return (
                  <div key={item.title[lang]}>
                    <Underway
                      {...props}
                      id={item.id}
                      title={item.title[lang]}
                      desc={
                        <div
                          className="referendum-detail"
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.6)", lineHeight: 1.8 }}
                        >
                          <p className="r-title">{item.desc[lang]}</p>
                          {item.reason && (
                            <p>
                              <span className="r-title">{intl.messages.REFERENDUM_PURPOSE}：</span>
                              {item.reason[lang]}
                            </p>
                          )}
                          <p>
                            <span className="r-title">{intl.messages.REFERENDUM_RULE}：</span>
                            {(item.rule && item.rule[lang]) || intl.messages.REFERENDUM_COMMON_RULE}
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
              .filter(({ isFinished }) => isFinished)
              .map(item => {
                return (
                  <div key={item.title[lang]}>
                    <Finished
                      {...props}
                      id={item.id}
                      title={item.title[lang]}
                      desc={
                        <div
                          className="referendum-detail"
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.6)", lineHeight: 1.8 }}
                        >
                          <p className="r-title">{item.desc[lang]}</p>
                          {item.reason && (
                            <p>
                              <span className="r-title">{intl.messages.REFERENDUM_PURPOSE}：</span>
                              {item.reason[lang]}
                            </p>
                          )}
                          <p>
                            <span className="r-title">{intl.messages.REFERENDUM_RULE}：</span>
                            {(item.rule && item.rule[lang]) || intl.messages.REFERENDUM_COMMON_RULE}
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
