import React, { useEffect, useMemo } from "react";
import { AddressLink, Amount, DateShow, Table } from "../../components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import { FormattedMessage } from "react-intl";

export default function HistoryEntrust({ activePair = {} }) {
  const { pairid } = activePair;

  if (pairid === undefined) return <RenderHistoryEntrust />;

  const [{ tableData }, setTableData] = useRedux(`historyEntrust_${pairid}`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0
      }
    }
  });

  const tableService = useMemo(() => new TableService(api.fetchTradeHistory$, tableData, { pairid }), [pairid]);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setTableData({ tableData: { ...data } }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderHistoryEntrust {...tableData} {...tableService} {...activePair} />;
}

export function RenderHistoryEntrust({
  handleChange,
  loading = true,
  pagination,
  precision,
  dataSource = [],
  unit_precision,
  currency_pair,
  pairid
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
            key: `${pairid}-${data.id}`,
            id: data.id,
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
            maker_user: <AddressLink style={{ maxWidth: 220 }} className="text-truncate" value={data.maker_user} />,
            maker_user_order_index: data.maker_user_order_index,
            taker_user: <AddressLink style={{ maxWidth: 220 }} className="text-truncate" value={data.taker_user} />,
            taker_user_order_index: data.taker_user_order_index,
            createTime: <DateShow value={data["block.time"]} />
          };
        })
      }
      columns={[
        {
          title: (
            <>
              <FormattedMessage id="FILL" />
              ID
            </>
          ),
          dataIndex: "id"
        },
        {
          title: (
            <>
              <FormattedMessage id="PRICE" />({currency_pair ? currency_pair[0] : "-"})
            </>
          ),
          dataIndex: "price"
        },
        {
          title: (
            <>
              <FormattedMessage id="AMOUNT" />({currency_pair ? currency_pair[0] : "-"})
            </>
          ),
          dataIndex: "amount"
        },
        {
          title: (
            <>
              maker
              <FormattedMessage id="ACCOUNT" />
            </>
          ),
          dataIndex: "maker_user"
        },
        {
          title: (
            <>
              maker
              <FormattedMessage id="ORDERNUMBER" />
            </>
          ),
          dataIndex: "maker_user_order_index"
        },
        {
          title: (
            <>
              taker
              <FormattedMessage id="ACCOUNT" />
            </>
          ),
          dataIndex: "taker_user"
        },
        {
          title: (
            <>
              taker
              <FormattedMessage id="ORDERNUMBER" />
            </>
          ),
          dataIndex: "taker_user_order_index"
        },
        {
          title: <FormattedMessage id="TIME" />,
          dataIndex: "createTime"
        }
      ]}
    />
  );
}
