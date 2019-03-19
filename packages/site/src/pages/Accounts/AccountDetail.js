import React, { useState, useEffect } from "react";

import api from "../../services/api";
import { PanelList, AddressLink, Number } from "../../components";

export default function Account(props) {
  const { match } = props;
  const {
    params: { accountId }
  } = match;

  const [detail, setDetail] = useState({});

  useEffect(() => {
    const subscription = api.fetchAccountDetail$(accountId).subscribe(data => setDetail(data));
    return () => subscription.unsubscribe();
  }, [accountId]);

  return (
    <div>
      <h4 className="title is-size-5">账户详情</h4>
      <PanelList
        dataSource={[
          {
            label: "账户地址",
            data: <AddressLink value={detail.accountId} />
          },
          {
            label: "账户交易数",
            data: <Number value={detail.txCount} />
          },
          {
            label: "BTC 充值地址",
            data: detail.btcAddress
          }
        ]}
      />
    </div>
  );
}
