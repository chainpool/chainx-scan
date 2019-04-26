import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { hexAddPrefix, hexStripPrefix } from "@polkadot/util";

import {
  ExternalLink,
  AddressLink,
  ValidatorIndex,
  PanelList,
  Breadcrumb,
  AntSpinner as Spinner,
  Amount,
  NumberFormat,
  NoData
} from "../../components";
import NominationsList from "./NominationsList";
import DetailMissedBlock from "./DetailMissedBlock";
import SettingList from "./SettingList";
import api from "../../services/api";

export default function ValidatorsDetail(props) {
  const {
    match: {
      params: { node, filter }
    }
  } = props;

  const [data, setData] = useState({});
  const [activeKey, setActiveKey] = useState("trust");
  let nodeId = void 0;
  try {
    nodeId = hexAddPrefix(node);
  } catch {}

  useEffect(() => {
    if (!!nodeId) {
      const subscription = api.fetchValidatorDetail$(nodeId).subscribe(data => setData(data), data => setData(data));
      return () => subscription.unsubscribe();
    }
  }, [nodeId]);

  const breadcrumb = () => {
    if (!!nodeId && !!data) {
      if (filter === "unsettled") {
        return <Breadcrumb dataSource={[{ to: "/validators/unsettled", label: "候选节点" }, { label: "节点详情" }]} />;
      } else if (filter === "all") {
        return <Breadcrumb dataSource={[{ to: "/validators", label: "验证节点" }, { label: "节点详情" }]} />;
      } else if (filter === "detail") {
        if (!data.isValidator) {
          return (
            <Breadcrumb dataSource={[{ to: "/validators/unsettled", label: "候选节点" }, { label: "节点详情" }]} />
          );
        } else {
          return <Breadcrumb dataSource={[{ to: "/validators", label: "验证节点" }, { label: "节点详情" }]} />;
        }
      } else {
        return <Breadcrumb dataSource={[{ to: `/validators/${filter}`, label: "信托节点" }, { label: "节点详情" }]} />;
      }
    } else {
      return <></>;
    }
  };
  if (!!nodeId && !data.code && data.name === undefined) {
    return (
      <>
        {breadcrumb()}
        <div style={{ paddingTop: "30%" }}>
          <Spinner />
        </div>
      </>
    );
  } else if (!nodeId) {
    return <NoData id={node} />;
  } else if (!!data.code) {
    return <NoData id={nodeId} />;
  }

  return (
    <div>
      {breadcrumb()}
      <PanelList
        dataSource={[
          {
            label: "排名",
            data: (
              <>
                <ValidatorIndex value={data.name} />
                {!!data.isTrustee && data.isTrustee.length <= 0 ? "" : <span className="table-tag-trust">信托</span>}
              </>
            )
          },
          {
            label: "名称",
            data: (
              <>
                {data.name}
                {!data.isActive && <span className="table-tag-nagtive">(已退选)</span>}
              </>
            )
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
            data: <Amount value={data.selfVote} />
          },
          {
            label: "总得票数",
            data: <Amount value={data.totalNomination} />
          },
          {
            label: "奖池金额",
            data: <Amount value={data.jackpot} />
          },
          {
            label: "漏块总数",
            data: (
              <span>
                <NumberFormat value={data.missedBlocks} />
                <span>{`(${(isNaN(data.missedBlocks / (data.missedBlocks + data.blocks))
                  ? 0
                  : (data.missedBlocks / (data.missedBlocks + data.blocks)) * 100
                ).toFixed(2)}%)`}</span>
              </span>
            )
          },
          {
            label: "出块总数",
            data: <NumberFormat value={data.blocks} />
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
            <li onClick={() => setActiveKey("miss")} className={classnames({ "is-active": activeKey === "miss" })}>
              <a>漏块列表</a>
            </li>
          </ul>
        </div>
        <>
          {activeKey === "trust" && <SettingList nodeID={nodeId} />}
          {activeKey === "vote" && <NominationsList nodeID={nodeId} />}
          {activeKey === "miss" && <DetailMissedBlock nodeId={hexStripPrefix(data.accountid)} />}
        </>
      </div>
    </div>
  );
}
