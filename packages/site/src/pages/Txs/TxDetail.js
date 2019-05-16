import React, { useState, useEffect } from "react";
import hexStripPrefix from "@polkadot/util/hex/stripPrefix";
import { FormattedMessage } from "react-intl";

import {
  BlockLink,
  AddressLink,
  TxLink,
  TxAction,
  PanelList,
  Breadcrumb,
  DateShow,
  AntSpinner as Spinner,
  NoData
} from "../../components";
import { RenderEvents } from "../Events";
import api from "../../services/api";

export default function BlockDetail(props) {
  const { match } = props;

  const [data, setData] = useState({});
  const [eventsData, setEventsData] = useState({});
  const [eventLoading, setEventLoading] = useState(true);

  const blockNumber = data.number;
  let txid = void 0;
  try {
    txid = hexStripPrefix(match.params.txid);
  } catch {}

  useEffect(() => {
    if (!!txid) {
      const subscription = api.fetchTxDetail$(txid).subscribe(data => setData(data), data => setData(data));
      return () => subscription.unsubscribe();
    }
  }, [txid]);

  useEffect(() => {
    if (!!txid) {
      const subscription = api.fetchEvents$({ tx: txid }).subscribe(({ items }) => {
        setEventLoading(false);
        setEventsData({ dataSource: items });
      });
      return () => subscription.unsubscribe();
    }
  }, [blockNumber]);

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: "/txs", label: <FormattedMessage id="EXTRINSICS" /> },
        { label: <FormattedMessage id="EXTRINSICDETAILS" /> }
      ]}
    />
  );

  if (!!txid && !data.code && !data.number) {
    return (
      <>
        {breadcrumb}
        <div style={{ paddingTop: "30%" }}>
          <Spinner />
        </div>
      </>
    );
  } else if (!txid) {
    return <NoData id={match.params.txid} />;
  } else if (!!data.code) {
    return <NoData id={txid} />;
  }

  return (
    <div>
      {breadcrumb}
      <PanelList
        dataSource={[
          {
            label: <FormattedMessage id="HEIGHT" />,
            data: <BlockLink value={data.number} />
          },
          {
            label: <FormattedMessage id="BLOCKTIME" />,
            data: <DateShow value={data.time} />
          },
          {
            label: <FormattedMessage id="NUMBER" />,
            data: data.index
          },
          {
            label: <FormattedMessage id="TRANSACTIONHASH" />,
            data: <TxLink value={data.hash} />
          },
          {
            label: <FormattedMessage id="SENDER" />,
            data: <AddressLink value={data.signed} />
          },
          {
            label: <FormattedMessage id="ACTION" />,
            data: <TxAction module={data.module} call={data.call} />
          },
          {
            label: <FormattedMessage id="PARAMETER" />,
            data: JSON.stringify(data.args.reduce((result, c) => Object.assign(result, { [c.name]: c.data }), {}))
          },
          {
            label: <FormattedMessage id="SIGN" />,
            data: data.signature
          },
          {
            label: <FormattedMessage id="VERSION" />,
            data: data.version
          },
          {
            label: <FormattedMessage id="ACCELERATE" />,
            data: data.acceleration
          },
          {
            label: "data",
            data: data.data
          }
        ]}
      />
      <div className="box">
        <div className="tabs">
          <ul>
            <li className="is-active">
              <a>
                <FormattedMessage id="EVENTS" />
              </a>
            </li>
          </ul>
        </div>
        {data && data.number && (
          <RenderEvents
            tableData={{ ...eventsData, eventLoading }}
            tableProps={{ pagination: false, simpleMode: true }}
          />
        )}
      </div>
    </div>
  );
}
