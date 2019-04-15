import React, { useEffect, useMemo } from "react";

import { DateShow, Amount, OrderDirection, Table } from "../../components";
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
    () => new TableService(api.fetchAccountFillOrders$, tableData, { accountId: props.accountId }),
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
          console.log(data);
          return {
            key: index,
            id: data.id,
            pair: `${data["pair"][0]}/${data["pair"][1]}`,
            direction: <OrderDirection value={data.direction} />,
            time: <DateShow value={data.time} />,
            amount: <Amount value={data.amount} symbol={data["pair"][0]} hideSymbol />,
            setPrice: <Amount value={data.set_price} symbol={data["pair"][0]} hideSymbol />,
            price: <Amount value={data.price} symbol={data["pair"][0]} hideSymbol />
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
          dataIndex: "setPrice"
        },
        {
          title: "数量",
          dataIndex: "amount"
        },
        {
          title: "成交均价",
          dataIndex: "price"
        },
        {
          title: "时间",
          dataIndex: "time"
        }
      ]}
    />
  );
}
