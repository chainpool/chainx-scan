import React, { useEffect, useMemo } from "react";
import { AddressLink, Amount, DateShow, OrderDirection, OrderStatus, Table, HasFill } from "../../components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import { FormattedMessage } from "react-intl";

export default function CurrentEntrust({ activePair = {} }) {
  const { pairid } = activePair;

  if (pairid === undefined) return <RenderCurrentEntrust />;

  const [{ tableData }, setTableData] = useRedux(`currentEntrust_${pairid}`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 20,
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
            key: `${data.accountid}-${data.id}`,
            accountid: <AddressLink style={{ maxWidth: 136 }} className="text-truncate" value={data.accountid} />,
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
            reserve_last: (
              <Amount
                value={data.reserve_last}
                symbol={data.direction === "Sell" ? currency_pair[0] : currency_pair[1]}
              />
            ),
            hasFillAmount: <HasFill fill={data.hasfill_amount} total={data.amount} symbol={currency_pair[0]} />,
            status: <OrderStatus value={data.status} />,
            createTime: <DateShow value={data["block.time"]} />
          };
        })
      }
      columns={[
        {
          title: <FormattedMessage id="DISCRETIONARYACCOUNT" />,
          dataIndex: "accountid"
        },
        {
          title: <FormattedMessage id="ORDERNUMBER" />,
          dataIndex: "id"
        },
        {
          title: <FormattedMessage id="TYPE" />,
          dataIndex: "direction"
        },
        {
          title: (
            <>
              <FormattedMessage id="ORDERPRICE" />({currency_pair ? currency_pair[1] : "-"})
            </>
          ),
          dataIndex: "price"
        },
        {
          title: (
            <>
              <FormattedMessage id="ORDERAMOUNT" />({currency_pair ? currency_pair[0] : "-"})
            </>
          ),
          dataIndex: "amount"
        },
        {
          title: (
            <>
              <FormattedMessage id="INORDER" />
            </>
          ),
          dataIndex: "reserve_last"
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
          dataIndex: "createTime"
        }
      ]}
    />
  );
}
