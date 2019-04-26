import React, { useEffect, useMemo } from "react";

import { Table, BlockLink, DateShow, NumberFormat, ValidatorLink } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { FormattedMessage } from "react-intl";

export default function BlocksList() {
  const [{ tableData }, setState] = useRedux("blocksList", { tableData: {} });

  const tableService = useMemo(() => new TableService(api.fetchBlocks$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return (
    <Table
      loading={tableData.loading}
      onChange={tableService.handleChange}
      pagination={tableData.pagination}
      dataSource={
        tableData.dataSource &&
        tableData.dataSource.map(data => {
          return {
            key: data.number,
            number: <BlockLink value={data.number} />,
            hash: <BlockLink style={{ width: 138 }} className="text-truncate" value={data.hash} />,
            time: <DateShow value={data.time} />,
            producer: <ValidatorLink value={data.producer} />,
            extrinsics: <NumberFormat value={data.extrinsics} />,
            eventCount: <NumberFormat value={data.event_count} />
          };
        })
      }
      columns={[
        {
          title: <FormattedMessage id="HEIGHT" />,
          dataIndex: "number"
        },
        {
          title: <FormattedMessage id="BLOCKHASH" />,
          dataIndex: "hash"
        },
        {
          title: <FormattedMessage id="BLOCKTIME" />,
          dataIndex: "time"
        },
        {
          title: <FormattedMessage id="VALIDTORS" />,
          dataIndex: "producer"
        },
        {
          title: <FormattedMessage id="TRANSACTIONCOUNT" />,
          dataIndex: "extrinsics"
        },
        {
          title: <FormattedMessage id="EVENTSCOUNT" />,
          dataIndex: "eventCount"
        }
      ]}
    />
  );
}
