import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { hexAddPrefix } from "@polkadot/util";
import { NavLink } from "react-router-dom";
import { BlockLink, ValidatorLink, DateShow, PanelList, Breadcrumb, AntSpinner as Spinner } from "../../components";
import { RenderTxsList } from "../Txs/TxsList";
import Events from "../Events";
import api from "../../services/api";
import Icon from "antd/lib/icon";

export default function BlockDetail(props) {
  const { match } = props;
  const [blocks, setBlock] = useState([]);
  const [data, setData] = useState({});
  const [txsData, setTxsData] = useState({});
  const [activeKey, setActiveKey] = useState("txs");
  const [txsLoading, setTxsLoading] = useState(true);
  const blockId = /^\d*$/.test(match.params.block) ? match.params.block : hexAddPrefix(match.params.block);
  const blockNumber = data.number;
  const hasNext = blocks.length > 0 && data.number && blocks[0].number >= data.number + 1;
  useEffect(() => {
    const subscription = api.fetchBlockDetail$(blockId).subscribe(
      ({ result: data }) => {
        setData(data);
      },
      error => {
        setData(error);
      }
    );
    return () => subscription.unsubscribe();
  }, [blockId]);

  useEffect(() => {
    const subscription = api.fetchLatestBlocks$(blockId).subscribe(blocks => setBlock(blocks));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = api.fetchTxs$({ block: blockNumber }).subscribe(({ result: { items } }) => {
      setTxsLoading(false);
      setTxsData({ dataSource: items });
    });
    return () => subscription.unsubscribe();
  }, [blockNumber]);

  const breadcrumb = <Breadcrumb dataSource={[{ to: "/blocks", label: "区块列表" }, { label: "区块详情" }]} />;
  if (!data || (!data.error && !data.number)) {
    return (
      <>
        {breadcrumb}
        <div style={{ padding: "10%" }}>
          <Spinner />
        </div>
      </>
    );
  } else if (data.error) {
    return (
      <>
        {breadcrumb}
        {/* TODO 未找到模块样式 */}
        <div style={{ padding: "10%", textAlign: "center" }}>未找到该区块</div>
      </>
    );
  }

  return (
    <div>
      {breadcrumb}
      <div className="switch-block">
        <NavLink to={`/blocks/${!!data && data.number - 1}`}>
          <Icon type="double-left" />
        </NavLink>
        区块高度:{!!data && data.number}
        <NavLink to={hasNext ? `/blocks/${!!data && data.number + 1}` : false}>
          <Icon className={classnames({ forbidden: !hasNext })} type="double-right" />
        </NavLink>
      </div>
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
            label: "出块时间",
            data: <DateShow value={data.time} format="YYYY-MM-DD HH:mm:ss" />
          },
          {
            label: "验证人",
            data: <ValidatorLink value={data.producer} />
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
          <RenderTxsList
            tableData={{ ...txsData, loading: txsLoading }}
            tableProps={{ pagination: false, simpleMode: true }}
          />
        )}
        {data && data.number && activeKey === "events" && <Events tableProps={{ simpleMode: true }} />}
      </div>
    </div>
  );
}
