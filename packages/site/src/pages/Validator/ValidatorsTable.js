import React from "react";

import { Table, AddressLink, ValidatorLink, ExternalLink, Amount, NumberFormat } from "../../components";
import { FormattedMessage } from "react-intl";

const indexExtend = (index, trust) => (
  <span className="nowrap">
    {index}
    {!!trust && trust.length <= 0 ? (
      ""
    ) : (
      <span className="table-tag-trust">
        <FormattedMessage id="TRUSTEE" />
      </span>
    )}
  </span>
);

export default function ValidatorsTable(props) {
  const { dataSource = [], pagination = {}, handleChange, loading, tabFilter } = props;
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
            name: <ValidatorLink name={data.name} value={data.accountid} isActive={data.isActive} filter={tabFilter} />,
            url: <ExternalLink style={{ maxWidth: 136 }} className="text-truncate" value={data.url} />,
            address: <AddressLink value={data.accountid} style={{ maxWidth: 136 }} className="text-truncate" />,
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
          title: <FormattedMessage id="RANKING" />,
          dataIndex: "index"
        },
        {
          title: <FormattedMessage id="NAME" />,
          dataIndex: "name"
        },
        {
          title: <FormattedMessage id="WEBSITE" />,
          dataIndex: "url"
        },
        {
          title: <FormattedMessage id="ACCOUNTADDRESS" />,
          dataIndex: "address"
        },
        {
          title: (
            <>
              <FormattedMessage id="SELFBONDED" />
              (PCX)
            </>
          ),
          dataIndex: "selfVote",
          align: "right"
        },
        {
          title: (
            <>
              <FormattedMessage id="TOTALNOMINATION" />
              (PCX)
            </>
          ),
          dataIndex: "totalNomination",
          align: "right"
        },
        {
          title: (
            <>
              <FormattedMessage id="JACKPOTBALANCE" />
              (PCX)
            </>
          ),
          dataIndex: "jackpot",
          align: "right"
        },
        {
          title: <FormattedMessage id="MISSEDBLOCKS" />,
          dataIndex: "missedBlocks"
        },
        {
          title: <FormattedMessage id="TOTALAUTHOREDBLOCKS" />,
          dataIndex: "blocks",
          align: "right"
        }
      ]}
    />
  );
}
