import React, { useState, useEffect } from "react";
import { hexStripPrefix } from "@polkadot/util";
import { NavLink } from "react-router-dom";

import { BlockLink, AddressLink, TxLink, TxAction, PanelList } from "../../components";
import { RenderEvents } from "../Events";
import api from "../../services/api";

export default function BlockDetail(props) {
  const { match } = props;

  const [data, setData] = useState({});
  const [eventsData, setEventsData] = useState({});

  const blockNumber = data.number;
  const txid = hexStripPrefix(match.params.txid);

  useEffect(() => {
    const subscription = api.fetchTxDetail$(txid).subscribe(data => setData(data));
    return () => subscription.unsubscribe();
  }, [txid]);

  useEffect(() => {
    const subscription = api
      .fetchEvents$({ block: blockNumber })
      .subscribe(({ items }) => setEventsData({ dataSource: items }));
    return () => subscription.unsubscribe();
  }, [blockNumber]);

  return (
    <div>
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <NavLink to="/txs">交易列表</NavLink>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">
              交易详情
            </a>
          </li>
        </ul>
      </nav>
      <PanelList
        dataSource={[
          {
            label: "区块高度",
            data: <BlockLink value={data.number} />
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
        {data && data.number && <RenderEvents tableData={eventsData} tableProps={{ pagination: false }} />}
      </div>
    </div>
  );
}
