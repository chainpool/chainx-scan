import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Table, ValidatorLink, ExternalLink } from "../../components";
import { FormattedMessage } from "react-intl";

export default function BindAddressList(props) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = api.fetchAccountBindAddresses$(props.accountId).subscribe(data => {
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
        tableData &&
        tableData.map(data => {
          return {
            key: data.address,
            chain: data.chain,
            address: (
              <ExternalLink
                style={{ maxWidth: 300 }}
                className="text-truncate"
                type={data.chain === "Ethereum" ? "ethAddress" : "btcAddress"}
                value={data.address}
              />
            ),
            channel: <ValidatorLink value={data.accountid} name={data["intention.name"]} />
          };
        })
      }
      columns={[
        {
          title: <FormattedMessage id="CHAIN" />,
          dataIndex: "chain"
        },
        {
          title: <FormattedMessage id="ADDRESS" />,
          dataIndex: "address"
        },
        {
          title: <FormattedMessage id="CHANELNAME" />,
          dataIndex: "channel"
        }
      ]}
    />
  );
}
