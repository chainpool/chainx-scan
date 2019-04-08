import React, { useState, useEffect } from "react";
import { hexStripPrefix } from "@polkadot/util";

import { Link, AddressLink, TxLink, TxAction, PanelList, Breadcrumb, AntSpinner as Spinner } from "../../components";
import { RenderEvents } from "../Events";
import api from "../../services/api";

export default function BlockDetail(props) {
  const { match } = props;

  const [data, setData] = useState({});
  const [eventsData, setEventsData] = useState({});
  const [eventLoading, setEventLoading] = useState(true);

  const blockNumber = data.number;
  const txid = hexStripPrefix(match.params.txid);

  useEffect(() => {
    const subscription = api.fetchTxDetail$(txid).subscribe(data => setData(data));
    return () => subscription.unsubscribe();
  }, [txid]);

  useEffect(() => {
    const subscription = api.fetchEvents$({ tx: txid }).subscribe(({ items }) => {
      setEventLoading(false);
      setEventsData({ dataSource: items });
    });
    return () => subscription.unsubscribe();
  }, [blockNumber]);

  const breadcrumb = <Breadcrumb dataSource={[{ to: "/txs", label: "交易列表" }, { label: "交易详情" }]} />;

  if (!data || !data.number) {
    return (
      <>
        {breadcrumb}
        <div style={{ paddingTop: "30%" }}>
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <div>
      {breadcrumb}
      <PanelList
        dataSource={[
          {
            label: "区块高度",
            data: <Link parent="blocks" value={data.number} />
          },
          {
            label: "序号",
            data: data.index
          },
          {
            label: "交易哈希",
            data: <TxLink value={data.hash} />
          },
          {
            label: "发送人",
            data: <AddressLink value={data.signed} />
          },
          {
            label: "签名",
            data: data.signature
          },
          {
            label: "操作",
            data: <TxAction module={data.module} call={data.call} />
          },
          {
            label: "参数",
            data: JSON.stringify(data.args)
          },
          {
            label: "版本",
            data: data.version
          },
          {
            label: "加速",
            data: data.acceleration
          },
          {
            label: "data",
            data: data.data
          }
        ]}
      />
      <div className="box">
        <div className="tabs">
          <ul>
            <li className="is-active">
              <a>事件列表</a>
            </li>
          </ul>
        </div>
        {data && data.number && (
          <RenderEvents
            tableData={{ ...eventsData, eventLoading }}
            tableProps={{ pagination: false, simpleMode: true }}
          />
        )}
      </div>
    </div>
  );
}
