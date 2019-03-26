import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { hexAddPrefix } from "@polkadot/util";

import { BlockLink, AddressLink, DateShow, PanelList, Breadcrumb, Spinner } from "../../components";
import { RenderTxsList } from "../Txs/TxsList";
import { RenderEvents } from "../Events";
import api from "../../services/api";

export default function BlockDetail(props) {
  const { match } = props;

  const [data, setData] = useState({});
  const [eventsData, setEventsData] = useState({});
  const [txsData, setTxsData] = useState({});
  const [activeKey, setActiveKey] = useState("txs");
  const blockId = /^\d*$/.test(match.params.block) ? match.params.block : hexAddPrefix(match.params.block);
  const blockNumber = data.number;

  useEffect(() => {
    const subscription = api.fetchBlockDetail$(blockId).subscribe(data => setData(data));
    return () => subscription.unsubscribe();
  }, [blockId]);

  useEffect(() => {
    const subscription = api
      .fetchEvents$({ block: blockNumber })
      .subscribe(({ items }) => setEventsData({ dataSource: items }));
    return () => subscription.unsubscribe();
  }, [blockNumber]);

  useEffect(() => {
    const subscription = api
      .fetchTxs$({ block: blockNumber })
      .subscribe(({ items }) => setTxsData({ dataSource: items }));
    return () => subscription.unsubscribe();
  }, [blockNumber]);

  const breadcrumb = <Breadcrumb dataSource={[{ to: "/blocks", label: "区块列表" }, { label: "区块详情" }]} />;

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
            data: <BlockLink value={data.number} />
          },
          {
            label: "区块哈希",
            data: <BlockLink value={data.hash} />
          },
          {
            label: "父哈希",
            data: <BlockLink value={data.parent_hash} />
          },
          {
            label: "状态根",
            data: data.state_root
          },
          {
            label: "交易根",
            data: data.extrinsics_root
          },
          {
            label: "区块时间",
            data: <DateShow value={data.time} format="YYYY-MM-DD HH:mm:ss" />
          },
          {
            label: "验证人",
            data: <AddressLink isValidator value={data.producer} />
          }
        ]}
      />
      <div className="box">
        <div className="tabs">
          <ul>
            <li onClick={() => setActiveKey("txs")} className={classnames({ "is-active": activeKey === "txs" })}>
              <a>交易列表</a>
            </li>
            <li onClick={() => setActiveKey("events")} className={classnames({ "is-active": activeKey === "events" })}>
              <a>事件列表</a>
            </li>
          </ul>
        </div>
        {data && data.number && activeKey === "txs" && (
          <RenderTxsList tableData={txsData} tableProps={{ pagination: false }} />
        )}
        {data && data.number && activeKey === "events" && (
          <RenderEvents tableData={eventsData} tableProps={{ pagination: false }} />
        )}
      </div>
    </div>
  );
}
