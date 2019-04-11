import React, { useEffect, useMemo } from "react";
import { AddressLink, Amount, DateShow, OrderDirection, OrderStatus, Table, HasFill } from "@src/components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

export default function CurrentEntrust({ activePair = {} }) {
  const { pairid, precision, unit_precision, currency_pair } = activePair;
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
    if (typeof pairid === "number") {
      const subscription = tableService
        .fetchTable()
        .getState$()
        .subscribe(data => setTableData({ tableData: { ...data } }));
      return () => subscription.unsubscribe();
    }
  }, [pairid]);
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
            accountid: <AddressLink style={{ maxWidth: 220 }} className="text-truncate" value={data.accountid} />,
            id: data.id,
            direction: <OrderDirection value={data.direction} />,
            price: (
              <Amount
                value={data.price}
                precision={precision}
                minDigits={precision - unit_precision}
                symbol={currency_pair[1]}
              />
            ),
            amount: <Amount value={data.amount} precision={precision} symbol="" />,
            reserve_last: <Amount value={data.reserve_last} precision={precision} symbol={currency_pair[0]} />,
            hasFillAmount: (
              <HasFill fill={data.hasfill_amount} total={data.amount} precision={data["pair.precision"]} />
            ),
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
          title: "委托价格",
          dataIndex: "price"
        },
        {
          title: "委托数量",
          dataIndex: "amount"
        },
        {
          title: "冻结金额",
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
