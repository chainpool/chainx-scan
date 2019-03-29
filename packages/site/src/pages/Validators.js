import React, { useEffect, useMemo } from "react";

import { Table, AddressLink, ExternalLink, Amount } from "../components";
import api from "../services/api";
import TableService from "../services/tableService";
import { useRedux, createStore } from "../shared";

const store = createStore({ tableData: {} });

export default function Validators(props) {
  const { tableProps } = props;

  const [{ tableData }, setState] = useRedux(store);
  const tableService = useMemo(() => new TableService(api.fetchIntentions$, tableData), []);

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
          return {
            key: `${data.accountid}`,
            index: (tableData.pagination.current - 1) * tableData.pagination.pageSize + index + 1,
            name: <AddressLink isValidator value={data.accountid} />,
            url: <ExternalLink value={data.url} />,
            address: <AddressLink value={data.accountid} style={{ maxWidth: 136 }} className="text-truncate" />,
            jackpotAddress: (
              <AddressLink value={data.jackpotAddress} style={{ maxWidth: 136 }} className="text-truncate" />
            ),
            selfVote: <Amount value={data.selfVote} />,
            totalNomination: <Amount value={data.totalNomination} />,
            jackpot: <Amount value={data.jackpot} />
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
          title: "奖池金额",
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
        }
      ]}
      {...tableProps}
    />
  );
}
