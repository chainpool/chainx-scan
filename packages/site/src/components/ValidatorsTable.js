import React from "react";

import { Table, AddressLink, AddressLinkExtend, ExternalLink, Amount, Number } from "../components";

const indexExtend = (index, trust) => (
  <span className="nowrap">
    {index}
    {!!trust && trust.length <= 0 ? "" : <span className="table-tag-trust">信托</span>}
  </span>
);

export default function ValidatorsTable(props) {
  const { dataSource = [], pagination = {}, handleChange, loading } = props;
  return (
    <Table
      loading={loading}
      onChange={handleChange}
      pagination={pagination}
      dataSource={
        dataSource &&
        dataSource.map((data, index) => {
          const _index = (pagination.current - 1) * pagination.pageSize + index + 1;
          return {
            key: `${data.accountid}`,
            index: indexExtend(_index, data.isTrustee),
            name: <AddressLinkExtend value={data.accountid} isActive={data.isActive} />,
            url: <ExternalLink value={data.url} />,
            address: (
              <AddressLink value={data.accountid} isActive style={{ maxWidth: 136 }} className="text-truncate" />
            ),
            jackpotAddress: (
              <AddressLink value={data.jackpotAddress} isActive style={{ maxWidth: 136 }} className="text-truncate" />
            ),
            selfVote: <Amount value={data.selfVote} hideSymbol />,
            totalNomination: <Amount value={data.totalNomination} hideSymbol />,
            jackpot: <Amount value={data.jackpot} hideSymbol />,
            blocks: <Number value={data.blocks} />
          };
        })
      }
      columns={[
        {
          title: "排名",
          dataIndex: "index"
        },
        {
          title: "名称",
          dataIndex: "name"
        },
        {
          title: "网址",
          dataIndex: "url"
        },
        {
          title: "账户地址",
          dataIndex: "address"
        },
        {
          title: "奖池地址",
          dataIndex: "jackpotAddress"
        },
        {
          title: "自抵押数",
          dataIndex: "selfVote",
          align: "right"
        },
        {
          title: "总得票数",
          dataIndex: "totalNomination",
          align: "right"
        },
        {
          title: "奖池金额",
          dataIndex: "jackpot",
          align: "right"
        },
        {
          title: "累计出块总数",
          dataIndex: "blocks",
          align: "right"
        }
      ]}
    />
  );
}
