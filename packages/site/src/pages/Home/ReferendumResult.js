import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AntSpinner as Spinner } from "../../components";
import { ReactComponent as Right } from "../../assets/right.svg";
import api from "../../services/api";
import { useRedux } from "../../shared";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";

export default injectIntl(function ReferendumResult({ intl }) {
  const [{ list }, setState] = useRedux("referendumResult", { list: [] });

  const lang = intl.locale.startsWith("en") ? "en" : "zh";

  useEffect(() => {
    const subscription = api.fetchReferendumDetailsAndTotal$().subscribe(data => setState({ list: data }));
    return () => subscription.unsubscribe();
  }, [api]);

  const getStatus = total => {
    const baseStyle = {
      borderRadius: 10,
      color: "#ffffff",
      fontSize: 12,
      padding: "2px 8px",
      marginLeft: 4
    };

    if (!total.isFinished) {
      return (
        <span style={{ ...baseStyle, background: "#F6C94A", color: "#000000" }}>{intl.messages.REFERENDUM_VOTE}</span>
      );
    } else if (total.no > total.yes) {
      return <span style={{ ...baseStyle, background: "#EA754B" }}>{intl.messages.REFERENDUM_FAIL}</span>;
    } else if (total.isPublish) {
      return <span style={{ ...baseStyle, background: "#959595" }}>{intl.messages.REFERENDUM_ISPUBLISH}</span>;
    } else {
      return <span style={{ ...baseStyle, background: "#34C69A" }}>{intl.messages.REFERENDUM_DEVELOPING}</span>;
    }
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <FormattedMessage id="公投列表" />
      </div>
      <div className="panel-block" style={{ height: 276, padding: 0 }}>
        {list && list.length ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "100%"
            }}
          >
            {list.map((item, index) => (
              <div
                key={item.id}
                style={{
                  paddingLeft: 16,
                  paddingRight: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                  borderBottom: index === list.length - 1 ? "0" : "1px solid #DEDEDE"
                }}
              >
                <div style={{ fontSize: 12 }}>{item.title[lang]}</div>
                {getStatus(item)}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Spinner />
          </div>
        )}
      </div>
      <div className="panel-block panel-footer-link" style={{ justifyContent: "center" }}>
        <NavLink className="view-more" to="/referendum/underway">
          <FormattedMessage id="SHOWALL" />
          <Right className="right" />
        </NavLink>
      </div>
    </section>
  );
});
