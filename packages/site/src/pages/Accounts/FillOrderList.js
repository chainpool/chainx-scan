import React, { useEffect, useState } from "react";

import { DateShow, Number, OrderDirection, Table } from "../../components";
import api from "../../services/api";

// TODO: add pagination
export default function FillOrderList(props) {
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = api.fetchAccountFillOrders$(props.accountId, { pageSize: 1000 }).subscribe(data => {
      setLoading(false);
      setTableData(data);
    });
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  return (
    <Table
      loading={loading}
      pagination={false}
      dataSource={
        tableData.items &&
        tableData.items.map((data, index) => {
          return {
            key: index,
            id: data.id,
            pair: `${data["pair"][0]}/${data["pair"][1]}`,
            direction: <OrderDirection value={data.direction} />,
            time: <DateShow value={data.time} />,
            amount: <Number value={data.amount} precision={data.precision} />,
            setPrice: <Number value={data.set_price} precision={data.precision} />,
            price: <Number value={data.price} precision={data.precision} />
          };
        })
      }
      columns={[
        {
          title: "交易ID",
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
