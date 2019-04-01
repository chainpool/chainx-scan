import React, { useEffect, useMemo } from "react";

import { Table, AddressLink, ExternalLink, Amount, Number } from "../components";
import api from "../services/api";
import TableService from "../services/tableService";
import { useRedux } from "../shared";

export default function Validators(props) {
  const { tableProps } = props;

  const [{ tableData }, setState] = useRedux("validators", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchIntentions$, tableData), []);
  const indexExtend = (index, trust) => (
    <span>
      {index}
      {!!trust && trust.length <= 0 ? "" : <span className="table-tag-trust">信托</span>}
    </span>
  );
  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return (
    <Table
      onChange={tableService.handleChange}
      pagination={tableData.pagination}
      dataSource={
        tableData.dataSource &&
        tableData.dataSource.map((data, index) => {
          const _index = (tableData.pagination.current - 1) * tableData.pagination.pageSize + index + 1;

          return {
            key: `${data.accountid}`,
            index: indexExtend(_index, data.isTrustee),
            name: <AddressLink isValidator value={data.accountid} isActive={data.isActive} />,
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
