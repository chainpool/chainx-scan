import React, { useEffect, useMemo } from "react";

import { DateShow, Amount, OrderDirection, Table, HasFill, OrderStatus } from "../../components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import { FormattedMessage } from "react-intl";

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
            fillAver: (
              <Amount
                value={data.fill_aver}
                precision={data["pair.precision"]}
                symbol={data["pair.currency_pair"][0]}
                hideSymbol
              />
            ),
            hasFillAmount: (
              <HasFill fill={data.hasfill_amount} total={data.amount} symbol={data["pair.currency_pair"][0]} />
            ),
            status: <OrderStatus value={data.status} />,
            price: (
              <Amount
                value={data.price}
                precision={data["pair.precision"]}
                symbol={data["pair.currency_pair"][0]}
                hideSymbol
              />
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
          title: <FormattedMessage id="TYPE" />,
          dataIndex: "direction"
        },
        {
          title: <FormattedMessage id="ORDERPRICE" />,
          dataIndex: "price"
        },
        {
          title: <FormattedMessage id="AMOUNT" />,
          dataIndex: "amount"
        },
        {
          title: <FormattedMessage id="AVERAGE" />,
          dataIndex: "fillAver"
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
          title: <FormattedMessage id="TIME" />,
          dataIndex: "time"
        }
      ]}
    />
  );
}
