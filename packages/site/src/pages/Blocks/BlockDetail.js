import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { hexAddPrefix } from "@polkadot/util";

import { fetch } from "../../shared";
import { BlockLink, AddressLink, DateShow, PanelList } from "../../components";
import TxsList from "../Txs/TxsList";
import Events from "../Events";

export default function BlockDetail(props) {
  const { match } = props;

  const [data, setData] = useState([]);
  const [activeKey, setActiveKey] = useState("txs");
  const queryParam = /^\d*$/.test(match.params.block) ? match.params.block : hexAddPrefix(match.params.block);
  const queryPath = `/block/${queryParam}`;

  useEffect(() => {
    fetchData();
  }, [queryPath]);

  async function fetchData() {
    const result = await fetch(queryPath);
    setData(result);
  }

  return (
    <div>
      <h4 className="title is-size-5">区块详情</h4>
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
          <TxsList path={`/txs?block=${data.number}`} tableProps={{ pagination: false }} />
        )}
        {data && data.number && activeKey === "events" && (
          <Events path={`/events?block=${data.number}`} tableProps={{ pagination: false }} />
        )}
      </div>
    </div>
  );
}
