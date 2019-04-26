import React, { useEffect, useMemo } from "react";

import { Amount, DateShow, OrderClass, OrderDirection, OrderStatus, Table, HasFill } from "../../components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import { FormattedMessage } from "react-intl";

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
          title: <FormattedMessage id="ORDERNUMBER" />,
          dataIndex: "id"
        },
        {
          title: <FormattedMessage id="TRADINGPAIR" />,
          dataIndex: "pair"
        },
        {
          title: <FormattedMessage id="PRICE" />,
          dataIndex: "price"
        },
        {
          title: <FormattedMessage id="CATEGORY" />,
          dataIndex: "class"
        },
        {
          title: <FormattedMessage id="TYPE" />,
          dataIndex: "direction"
        },
        {
          title: <FormattedMessage id="AMOUNT" />,
          dataIndex: "amount"
        },
        {
          title: (
            <>
              <FormattedMessage id="FILLED" />/<FormattedMessage id="FILLEDPERCENT" />
            </>
          ),
          dataIndex: "hasFillAmount"
        },
        {
          title: <FormattedMessage id="STATUS" />,
          dataIndex: "status"
        },
        {
          title: <FormattedMessage id="CREATEAT" />,
          dataIndex: "createTime"
        },
        {
          title: <FormattedMessage id="LASTUPDATE" />,
          dataIndex: "updateTime"
        }
      ]}
    />
  );
}
