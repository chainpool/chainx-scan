import React, { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { AddressLink, Amount, NumberFormat } from "../../components";
import { useRedux, encodeAddress } from "../../shared";
import api from "../../services/api";
import { ReactComponent as Right } from "../../assets/right-1.svg";
import { ReactComponent as Delete } from "../../assets/delete-1.svg";
import "../../balloon.css";
import { injectIntl } from "react-intl";

function ReferendumList({ value, title, intl }) {
  return (
    <section className="panel">
      <div className="panel-heading">{title}</div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>{intl.messages.REFERENDUM_VOTE_ADDRESS}</th>
              <th className="has-text-right">{intl.messages.REFERENDUM_PCX_BALANCE}</th>
              {/* <th>备注</th> */}
            </tr>
          </thead>
          <tbody>
            {value
              .sort((a, b) => b.value - a.value)
              .map(({ signed, value, memo }) => (
                <tr key={signed}>
                  <td>
                    <AddressLink value={signed} />
                  </td>
                  <td className="has-text-right">
                    <Amount value={value} hideSymbol />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Finished({ id, title, desc, intl }) {
  const [{ detail, list, total, show }, setState] = useRedux(`referndum-finished-${id}`, {
    detail: {},
    list: { yes: [], no: [] },
    total: {},
    show: false
  });

  const { yes: yesList, no: noList } = list;

  useEffect(() => {
    api.fetchReferendumDetail$(id).subscribe(data => {
      setState({ detail: data });
    });
  }, [api, id]);

  useEffect(() => {
    api.fetchReferendumList$(id).subscribe(data => {
      setState({ list: data });
    });
  }, [api, id]);

  useEffect(() => {
    api.fetchReferendumTotal$(id).subscribe(data => {
      setState({
        total: {
          finished: true,
          ...data
        }
      });
    });
  }, [api, id]);

  const getStatus = () => {
    const baseStyle = {
      borderRadius: 12,
      color: "#ffffff",
      fontSize: 14,
      padding: "2px 8px",
      marginLeft: 8
    };

    if (total.finished && !total.yes && !total.no) {
      return <span style={{ ...baseStyle, background: "#959595" }}>{intl.messages.REFERENDUM_STATISTICAL}</span>;
    } else if (total.no > total.yes) {
      return <span style={{ ...baseStyle, background: "#EA754B" }}>{intl.messages.REFERENDUM_FAIL}</span>;
    } else if (total.isPublish) {
      return <span style={{ ...baseStyle, background: "#959595" }}>{intl.messages.REFERENDUM_ISPUBLISH}</span>;
    } else {
      return <span style={{ ...baseStyle, background: "#34C69A" }}>{intl.messages.REFERENDUM_DEVELOPING}</span>;
    }
  };

  return (
    <div>
      <div className="referendum">
        <div className="referendum-header">
          <div className="referendum-title" onClick={() => setState({ show: !show })}>
            <div className="referendum-title-content">
              {title}
              {getStatus()}
            </div>
            {total.finished && !total.yes && !total.no ? (
              <div>{intl.messages.REFERENDUM_STATISTICAL}......</div>
            ) : (
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", alignItems: "center", marginRight: 56 }}>
                  <Right style={{ marginRight: 8 }} />{" "}
                  <span style={{ fontSize: 14, color: "#03AC79" }}>{intl.messages.REFERENDUM_FOR}：</span>
                  <Amount value={total.yes} hideSymbol /> {intl.messages.REFERENDUM_UNIT}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Delete style={{ marginRight: 8 }} />{" "}
                  <span style={{ fontSize: 14, color: "#C54315" }}>{intl.messages.REFERENDUM_AGAINST}：</span>
                  <Amount value={total.no} hideSymbol /> {intl.messages.REFERENDUM_UNIT}
                </div>
              </div>
            )}
          </div>
          {show && <div className="referendum-content">{desc}</div>}
          {show && (
            <div className="referendum-address">
              <div className="referendum-address-item">
                {intl.messages.REFERENDUM_FOR_ADDRESS}：
                <AddressLink
                  value={detail.yes}
                  render={address => (
                    <div>
                      {address.substr(0, 2)}
                      <span style={{ color: "#C54315" }}>{address.substr(2, 3)}</span>
                      {address.substr(5)}
                    </div>
                  )}
                />
                <CopyToClipboard text={encodeAddress(detail.yes)}>
                  <a className="button is-small is-text">{intl.messages.REFERENDUM_COPY}</a>
                </CopyToClipboard>
              </div>
              <div className="referendum-address-item">
                {intl.messages.REFERENDUM_AGAINST_ADDRESS}：
                <AddressLink
                  value={detail.no}
                  render={address => (
                    <div>
                      {address.substr(0, 2)}
                      <span style={{ color: "#C54315" }}>{address.substr(2, 3)}</span>
                      {address.substr(5)}
                    </div>
                  )}
                />
                <CopyToClipboard text={encodeAddress(detail.no)}>
                  <a className="button is-small is-text">{intl.messages.REFERENDUM_COPY}</a>
                </CopyToClipboard>
              </div>
            </div>
          )}
        </div>
        {show && (
          <div className="referendum-progress">
            <div className="referendum-progress-left" style={{ flex: total.yes || 1 }}>
              <NumberFormat
                value={total.yes / (total.yes + total.no)}
                options={{ style: "percent", minimumFractionDigits: 2 }}
              />
            </div>
            <div className="referendum-progress-right" style={{ flex: total.no || 1 }}>
              <NumberFormat
                value={total.no / (total.yes + total.no)}
                options={{ style: "percent", minimumFractionDigits: 2 }}
              />
            </div>
          </div>
        )}
        {show && (
          <div className="referendum-list">
            <div className="referendum-list-item" style={{ paddingRight: 16 }}>
              <ReferendumList value={yesList} title={intl.messages.REFERENDUM_FOR_LIST} intl={intl} />
            </div>
            <div className="referendum-list-item">
              <ReferendumList value={noList} title={intl.messages.REFERENDUM_AGAINST_LIST} intl={intl} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default injectIntl(Finished);
