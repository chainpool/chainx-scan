import React, { useEffect, useMemo } from "react";
import { AddressLink, Amount, DateShow, Table } from "../../components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

export default function HistoryEntrust({ activePair = {} }) {
  const { pairid } = activePair;

  if (pairid === undefined) return <RenderHistoryEntrust />;

  const [{ tableData }, setTableData] = useRedux(`historyEntrust_${pairid}`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0
      }
    }
  });

  const tableService = useMemo(() => new TableService(api.fetchTradeHistory$, tableData, { pairid }), [pairid]);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setTableData({ tableData: { ...data } }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderHistoryEntrust {...tableData} {...tableService} {...activePair} />;
}

export function RenderHistoryEntrust({
  handleChange,
  loading = true,
  pagination,
  precision,
  dataSource = [],
  unit_precision,
  currency_pair,
  pairid
}) {
  return (
    <Table
      onChange={handleChange}
      loading={loading}
      pagination={pagination}
      dataSource={
        dataSource &&
        dataSource.map(data => {
          return {
            key: `${pairid}-${data.id}`,
            id: data.id,
            price: (
              <Amount
                value={data.price}
                precision={precision}
                minDigits={precision - unit_precision}
                symbol={currency_pair[0]}
                hideSymbol
              />
            ),
            amount: <Amount value={data.amount} symbol={currency_pair[1]} hideSymbol />,
            maker_user: <AddressLink style={{ maxWidth: 220 }} className="text-truncate" value={data.maker_user} />,
            maker_user_order_index: data.maker_user_order_index,
            taker_user: <AddressLink style={{ maxWidth: 220 }} className="text-truncate" value={data.taker_user} />,
            taker_user_order_index: data.taker_user_order_index,
            createTime: <DateShow value={data["block.time"]} />
          };
        })
      }
      columns={[
        {
          title: "成交ID",
          dataIndex: "id"
        },
        {
          title: `价格(${currency_pair ? currency_pair[0] : "-"})`,
          dataIndex: "price"
        },
        {
          title: `数量(${currency_pair ? currency_pair[1] : "-"})`,
          dataIndex: "amount"
        },
        {
          title: "maker账户",
          dataIndex: "maker_user"
        },
        {
          title: "maker委托编号",
          dataIndex: "maker_user_order_index"
        },
        {
          title: "taker账户",
          dataIndex: "taker_user"
        },
        {
          title: "taker委托编号",
          dataIndex: "taker_user_order_index"
        },
        {
          title: "时间",
          dataIndex: "createTime"
        }
      ]}
    />
  );
}
