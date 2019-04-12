import React, { useEffect, useMemo } from "react";
import { AddressLink, Amount, DateShow, OrderDirection, OrderStatus, Table, HasFill } from "../../components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

export default function CurrentEntrust({ activePair = {} }) {
  const { pairid } = activePair;

  if (pairid === undefined) return <RenderCurrentEntrust />;

  const [{ tableData }, setTableData] = useRedux(`currentEntrust_${pairid}`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  });

  const tableService = useMemo(() => new TableService(api.fetchTradeCurrent$, tableData, { pairid }), [pairid]);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setTableData({ tableData: { ...data } }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCurrentEntrust {...tableData} {...tableService} {...activePair} />;
}

export function RenderCurrentEntrust({
  handleChange,
  loading = true,
  pagination,
  dataSource = [],
  precision,
  unit_precision,
  currency_pair
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
            key: data.id,
            accountid: <AddressLink style={{ maxWidth: 220 }} className="text-truncate" value={data.accountid} />,
            id: data.id,
            direction: <OrderDirection value={data.direction} />,
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
            reserve_last: <Amount value={data.reserve_last} symbol={currency_pair[1]} hideSymbol />,
            hasFillAmount: <HasFill fill={data.hasfill_amount} total={data.amount} symbol={currency_pair[0]} />,
            status: <OrderStatus value={data.status} />,
            createTime: <DateShow value={data["block.time"]} />
          };
        })
      }
      columns={[
        {
          title: "委托账户",
          dataIndex: "accountid"
        },
        {
          title: "委托账户编号",
          dataIndex: "id"
        },
        {
          title: "方向",
          dataIndex: "direction"
        },
        {
          title: `委托价格(${currency_pair ? currency_pair[1] : "-"})`,
          dataIndex: "price"
        },
        {
          title: `委托数量(${currency_pair ? currency_pair[0] : "-"})`,
          dataIndex: "amount"
        },
        {
          title: `冻结金额(${currency_pair ? currency_pair[0] : "-"})`,
          dataIndex: "reserve_last"
        },
        {
          title: "已成交数量/成交率",
          dataIndex: "hasFillAmount"
        },
        {
          title: "状态",
          dataIndex: "status"
        },
        {
          title: "时间",
          dataIndex: "createTime"
        }
      ]}
    />
  );
}
