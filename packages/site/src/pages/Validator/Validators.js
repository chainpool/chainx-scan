import React, { useEffect, useMemo } from "react";

import { Table, AddressLink, ExternalLink, Amount, Number } from "../../components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

const indexExtend = (index, trust) => (
  <span className="nowrap">
    {index}
    {!!trust && trust.length <= 0 ? "" : <span className="table-tag-trust">信托</span>}
  </span>
);

const AddressLinkExtend = (value, isValidator, isActive) => (
  <span className="nowrap">
    <AddressLink isValidator value={value} />
    {!isActive && <span className="table-tag-nagtive">(已退选)</span>}
  </span>
);

export default function Validators(props) {
  const { tableProps, tabIndex } = props;
  const [{ tableData }, setState] = useRedux("validators", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchIntentions$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => {
      setState({ tableData: data });
    });
    return () => subscription.unsubscribe();
  }, [tableService]);

  let viewData = [];
  if (tabIndex === 1)
    viewData = tableData.dataSource && tableData.dataSource.filter(item => item.isTrustee.indexOf("Bitcoin") >= 0);
  else if (tabIndex === 2) viewData = tableData.dataSource && tableData.dataSource.filter(item => !item.isValidator);
  else viewData = tableData.dataSource && [...tableData.dataSource];

  return (
    <Table
      onChange={tableService.handleChange}
      pagination={tableData.pagination}
      dataSource={
        viewData &&
        viewData.map((data, index) => {
          const _index = (tableData.pagination.current - 1) * tableData.pagination.pageSize + index + 1;

          return {
            key: `${data.accountid}`,
            index: indexExtend(_index, data.isTrustee),
            name: AddressLinkExtend(data.accountid, true, data.isActive),
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
      {...tableProps}
    />
  );
}
