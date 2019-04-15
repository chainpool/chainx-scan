import React from "react";

import { Table, AddressLink, ValidatorLink, ExternalLink, Amount, NumberFormat } from "../../components";

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
            name: <ValidatorLink name={data.name} value={data.accountid} isActive={data.isActive} />,
            url: <ExternalLink value={data.url} />,
            address: (
              <AddressLink value={data.accountid} isActive style={{ maxWidth: 136 }} className="text-truncate" />
            ),
            missedBlocks: (
              <span>
                <NumberFormat value={data.missedBlocks} />
                <span className="table-tag-nagtive">{`(${(isNaN(data.missedBlocks / (data.missedBlocks + data.blocks))
                  ? 0
                  : (data.missedBlocks / (data.missedBlocks + data.blocks)) * 100
                ).toFixed(2)}%)`}</span>
              </span>
            ),
            selfVote: <Amount value={data.selfVote} hideSymbol />,
            totalNomination: <Amount value={data.totalNomination} hideSymbol />,
            jackpot: <Amount value={data.jackpot} hideSymbol />,
            blocks: <NumberFormat value={data.blocks} />
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
          title: "自抵押数(PCX)",
          dataIndex: "selfVote",
          align: "right"
        },
        {
          title: "总得票数(PCX)",
          dataIndex: "totalNomination",
          align: "right"
        },
        {
          title: "奖池金额(PCX)",
          dataIndex: "jackpot",
          align: "right"
        },
        {
          title: "漏块总数",
          dataIndex: "missedBlocks"
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
