import React, { useState, useEffect } from "react";

import { Table, Amount, DateShow, OrderDirection, OrderStatus, OrderClass } from "../../components";
import api from "../../services/api";

export default function AccountOrder(props) {
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    const subscription = api.fetchAccountOrders$(props.accountId).subscribe(data => setTableData(data));
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  console.log(tableData);

  return (
    <Table
      pagination={false}
      dataSource={
        tableData.items &&
        tableData.items.map(data => {
          return {
            key: data.id,
            id: data.id,
            price: data.price,
            class: <OrderClass value={data.class} />,
            direction: <OrderDirection value={data.direction} />,
            status: <OrderStatus value={data.status} />,
            createTime: <DateShow value={data["block.time"]} />
            // nominee: <AddressLink value={data.nominee} isValidator />,
            // nomination: <Amount value={data.nomination} />
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
          dataIndex: "nomination"
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
          title: "状态",
          dataIndex: "status"
        },
        {
          title: "创建时间",
          dataIndex: "createTime"
        }
      ]}
    />
  );
}
