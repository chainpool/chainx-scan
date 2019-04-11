import React, { useEffect, useMemo } from "react";

import { Amount, DateShow, OrderClass, OrderDirection, OrderStatus, Table } from "../../components";
import { HasFill } from "@src/components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

export default function AccountOrder(props) {
  const [{ tableData }, setTableData] = useRedux(`accountOrder`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  });
  const tableService = useMemo(
    () => new TableService(api.fetchAccountOrders$, tableData, { accountId: props.accountId, status: 0 }),
    []
  );

  useEffect(() => {
    const subscription = tableService
      .fetchTable()
      .getState$()
      .subscribe(data => setTableData({ tableData: { ...data } }));
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  return (
    <Table
      onChange={tableService.handleChange}
      loading={tableData.loading}
      pagination={tableData.pagination}
      dataSource={
        tableData.dataSource &&
        tableData.dataSource.map(data => {
          return {
            key: data.id,
            id: data.id,
            pair: `${data["pair.currency_pair"][0]}/${data["pair.currency_pair"][1]}`,
            price: <Amount value={data.price} symbol={data["pair.currency_pair"][0]} hideSymbol />,
            class: <OrderClass value={data.class} />,
            direction: <OrderDirection value={data.direction} />,
            status: <OrderStatus value={data.status} />,
            createTime: <DateShow value={data["block.time"]} />,
            updateTime: <DateShow value={data["updateBlock.time"]} />,
            amount: <Amount value={data.amount} symbol={data["pair.currency_pair"][0]} hideSymbol />,
            hasFillAmount: (
              <HasFill fill={data.hasfill_amount} total={data.amount} symbol={data["pair.currency_pair"][0]} />
            )
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
