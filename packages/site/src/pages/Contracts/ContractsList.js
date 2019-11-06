import React, { useEffect, useMemo } from "react";

import { AddressLink, TxLink, ContractLink, BlockLink, Table } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function AccountsList() {
  const [{ tableData }, setState] = useRedux("contracts", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchContracts$, tableData), []);

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
        tableData.dataSource.map((data, index) => {
          return {
            key: index,
            height: <BlockLink value={data.height} />,
            contract: <ContractLink style={{ maxWidth: 180 }} className="text-truncate" value={`0x${data.contract}`} />,
            codeHash: `0x${data.code_hash}`,
            account: <AddressLink style={{ maxWidth: 180 }} className="text-truncate" value={`0x${data.account}`} />
          };
        })
      }
      columns={[
        {
          title: <FormattedMessage id="合约地址" />,
          dataIndex: "contract"
        },
        {
          title: <FormattedMessage id="代码哈希" />,
          dataIndex: "codeHash"
        },
        {
          title: <FormattedMessage id="区块高度" />,
          dataIndex: "height"
        },
        {
          title: <FormattedMessage id="部署账户" />,
          dataIndex: "account"
        }
      ]}
    />
  );
}
