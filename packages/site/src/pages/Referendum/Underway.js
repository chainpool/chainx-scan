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
                  {/* <td style={{ width: 108 }}>
                    <AddressLink style={{ width: 88 }} className="text-truncate" value={signed} />
                  </td>
                  <td style={{ whiteSpace: "nowrap", width: 137 }} class="has-text-right">
                    <Amount value={value} hideSymbol />
                  </td> */}
                  {/* <td>
                    {memo && (
                      <span
                        style={{ textAlign: "left" }}
                        aria-label={memo}
                        data-balloon-pos="up"
                        data-balloon-length="fit"
                      >
                        <span style={{ maxWidth: 320, display: "inline-block" }} className="text-truncate">
                          {memo}
                        </span>
                      </span>
                    )}
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
function Underway({ id, title, desc, intl }) {
  const [{ detail, list, total }, setState] = useRedux(`referndum-underway-${id}`, {
    detail: {},
    list: { yes: [], no: [] },
    total: {}
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
      setState({ total: data });
    });
  }, [api, id]);

  return (
    <div>
      <div className="referendum">
        <div className="referendum-header">
          <div className="referendum-title">
            <div className="referendum-title-content">{title}</div>
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
          </div>
          <div className="referendum-content">{desc}</div>
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
        </div>
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
        <div className="referendum-list">
          <div className="referendum-list-item" style={{ paddingRight: 16 }}>
            <ReferendumList value={yesList} title={intl.messages.REFERENDUM_FOR_LIST} intl={intl} />
          </div>
          <div className="referendum-list-item">
            <ReferendumList value={noList} title={intl.messages.REFERENDUM_AGAINST_LIST} intl={intl} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(Underway);
