import React, { useEffect, useMemo } from "react";

import { DateShow, Amount, OrderDirection, Table, HasFill, OrderStatus } from "../../components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

// TODO: add pagination
export default function FillOrderList(props) {
  const [{ tableData }, setTableData] = useRedux(`fillOrderList`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  });
  const tableService = useMemo(
    () => new TableService(api.fetchAccountOrders$, tableData, { accountId: props.accountId, status: 3 }),
    []
  );

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setTableData({ tableData: { ...data } }));
    return () => subscription.unsubscribe();
  }, [props.accountId]);
  return (
    <Table
      onChange={tableService.handleChange}
      loading={tableData.loading}
      pagination={tableData.pagination}
      dataSource={
        tableData.dataSource &&
        tableData.dataSource.map((data, index) => {
          return {
            key: index,
            id: data.id,
            pair: `${data["pair.currency_pair"][0]}/${data["pair.currency_pair"][1]}`,
            direction: <OrderDirection value={data.direction} />,
            time: <DateShow value={data["block.time"]} />,
            amount: <Amount value={data.amount} symbol={data["pair.currency_pair"][0]} hideSymbol />,
            setPrice: <Amount value={data.set_price} symbol={data["pair.currency_pair"][0]} hideSymbol />,
            fill_aver: <Amount value={data.fill_aver} symbol={data["pair.currency_pair"][0]} hideSymbol />,
            hasFillAmount: (
              <HasFill fill={data.hasfill_amount} total={data.amount} symbol={data["pair.currency_pair"][0]} />
            ),
            status: <OrderStatus value={data.status} />
          };
        })
      }
      columns={[
        {
          title: "委托编号",
          dataIndex: "id"
        },
        {
          title: "交易对",
          dataIndex: "pair"
        },
        {
          title: "方向",
          dataIndex: "direction"
        },
        {
          title: "委托价格",
          dataIndex: "price"
        },
        {
          title: "数量",
          dataIndex: "amount"
        },
        {
          title: "成交均价",
          dataIndex: "fill_aver"
        },
        {
          title: "成交数量/成交率",
          dataIndex: "hasFillAmount"
        },
        {
          title: "状态",
          dataIndex: "status"
        },
        {
          title: "时间",
          dataIndex: "time"
        }
      ]}
    />
  );
}
