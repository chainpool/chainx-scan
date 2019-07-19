import React, { useEffect, useMemo } from "react";

import { AddressLink, Amount, NumberFormat } from "../../components";
import { useRedux, encodeAddress } from "../../shared";
import api from "../../services/api";
import { ReactComponent as Right } from "../../assets/right-1.svg";
import { ReactComponent as Delete } from "../../assets/delete-1.svg";

import { CopyToClipboard } from "react-copy-to-clipboard";

function ReferendumList({ value, title }) {
  return (
    <section className="panel">
      <div className="panel-heading">{title}</div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>投票地址</th>
              <th>PCX 总余额</th>
            </tr>
          </thead>
          <tbody>
            {value.map(({ signed, value }) => (
              <tr key={signed}>
                <td>
                  <AddressLink value={signed} />
                </td>
                <td>
                  <Amount value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default function Underway({ id, title, desc }) {
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
                <Right style={{ marginRight: 8 }} /> <span style={{ fontSize: 14, color: "#03AC79" }}>赞成：</span>
                <Amount value={total.yes} hideSymbol /> 票
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Delete style={{ marginRight: 8 }} /> <span style={{ fontSize: 14, color: "#C54315" }}>反对：</span>
                <Amount value={total.no} hideSymbol /> 票
              </div>
            </div>
          </div>
          <div className="referendum-content">{desc}</div>
          <div className="referendum-address">
            <div className="referendum-address-item">
              赞成地址：
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
                <a className="button is-small is-text">复制</a>
              </CopyToClipboard>
            </div>
            <div className="referendum-address-item">
              反对地址：
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
                <a className="button is-small is-text">复制</a>
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
            <ReferendumList value={yesList} title="赞成列表" />
          </div>
          <div className="referendum-list-item">
            <ReferendumList value={noList} title="反对列表" />
          </div>
        </div>
      </div>
    </div>
  );
}
