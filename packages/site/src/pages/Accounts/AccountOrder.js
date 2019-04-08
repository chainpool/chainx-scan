import React, { useEffect, useState } from "react";

import { Amount, DateShow, Number, OrderClass, OrderDirection, OrderStatus, Table } from "../../components";
import HasFill from "./HasFill";
import api from "../../services/api";

export default function AccountOrder(props) {
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = api.fetchAccountOrders$(props.accountId).subscribe(data => {
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
        tableData.items.map(data => {
          return {
            key: data.id,
            id: data.id,
            pair: `${data["pair.currency_pair"][0]}/${data["pair.currency_pair"][1]}`,
            price: <Amount value={data.price} symbol={data["pair.currency_pair"][0]} hideSymbol={true} />,
            class: <OrderClass value={data.class} />,
            direction: <OrderDirection value={data.direction} />,
            status: <OrderStatus value={data.status} />,
            createTime: <DateShow value={data["block.time"]} />,
            updateTime: <DateShow value={data["updateBlock.time"]} />,
            amount: <Number value={data.amount} precision={data["pair.precision"]} />,
            hasFillAmount: <HasFill fill={data.hasfill_amount} total={data.amount} precision={data["pair.precision"]} />
          };
        })
      }
      columns={[
        {
          title: "挂单序号",
          dataIndex: "id"
        },
        {
          title: "交易对",
          dataIndex: "pair"
        },
        {
          title: "价格",
          dataIndex: "price"
        },
        {
          title: "类型",
          dataIndex: "class"
        },
        {
          title: "方向",
          dataIndex: "direction"
        },
        {
          title: "数量",
          dataIndex: "amount"
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
          title: "创建时间",
          dataIndex: "createTime"
        },
        {
          title: "最后更新时间",
          dataIndex: "updateTime"
        }
      ]}
    />
  );
}
