import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { hexAddPrefix } from "@polkadot/util";

import { ExternalLink, AddressLink, PanelList, Breadcrumb, Spinner, Amount, Number } from "../../components";
import NominationsList from "./NominationsList";
import SettingList from "./SettingList";
import api from "../../services/api";

export default function BlockDetail(props) {
  const { match } = props;

  const [data, setData] = useState({});
  const [activeKey, setActiveKey] = useState("trust");
  const nodeId = /^\d*$/.test(match.params.node) ? match.params.node : hexAddPrefix(match.params.node);

  useEffect(() => {
    const subscription = api.fetchValidatorDetail$(nodeId).subscribe(data => setData(data));
    return () => subscription.unsubscribe();
  }, [nodeId]);

  const breadcrumb = <Breadcrumb dataSource={[{ to: "/validators", label: "验证节点" }, { label: "节点详情" }]} />;

  if (!data) {
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
            label: "名称",
            data: data.name
          },
          {
            label: "网站",
            data: <ExternalLink value={data.url} />
          },
          {
            label: "账户地址",
            data: <AddressLink value={data.accountid} isActive className="text-truncate" />
          },
          {
            label: "出块地址",
            data: <AddressLink value={data.sessionKey} isActive className="text-truncate" />
          },
          {
            label: "奖池地址",
            data: <AddressLink value={data.jackpotAddress} isActive className="text-truncate" />
          },
          {
            label: "自抵押数",
            data: <Amount value={data.selfVote} hideSymbol />
          },
          {
            label: "总得票数",
            data: <Amount value={data.totalNomination} hideSymbol />
          },
          {
            label: "奖池金额",
            data: <Amount value={data.jackpot} hideSymbol />
          },
          {
            label: "出块总数",
            data: <Number value={data.blocks} />
          },
          {
            label: "票龄最新高度",
            data: data.lastTotalVoteWeightUpdate
          },
          {
            label: "历史总票龄",
            data: data.lastTotalVoteWeight
          }
        ]}
      />
      <div className="box">
        <div className="tabs">
          <ul>
            <li onClick={() => setActiveKey("trust")} className={classnames({ "is-active": activeKey === "trust" })}>
              <a>信托设置</a>
            </li>
            <li onClick={() => setActiveKey("vote")} className={classnames({ "is-active": activeKey === "vote" })}>
              <a>投票用户列表</a>
            </li>
          </ul>
        </div>
        <>
          {activeKey === "trust" && <SettingList nodeID={nodeId} />}
          {activeKey === "vote" && <NominationsList nodeID={nodeId} />}
        </>
      </div>
    </div>
  );
}
