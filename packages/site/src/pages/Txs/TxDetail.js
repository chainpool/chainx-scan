import React, { useState, useEffect, useMemo } from "react";
import hexStripPrefix from "@polkadot/util/hex/stripPrefix";
import { FormattedMessage } from "react-intl";

import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

import { ReactComponent as Success } from "../../assets/success.svg";
import { ReactComponent as Error } from "../../assets/error.svg";

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

  const [{ tableData: eventsData }, setEventsData] = useRedux(`TxEventData`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  });

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

  const eventService = useMemo(() => new TableService(api.fetchEvents$, eventsData, { tx: txid }), [txid]);

  useEffect(() => {
    if (!!txid) {
      const subscription = eventService.fetchTable$().subscribe(data => setEventsData({ tableData: { ...data } }));
      return () => subscription.unsubscribe();
    }
  }, [txid]);

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
            label: <FormattedMessage id="RESULT" />,
            data: {
              ExtrinsicSuccess: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Success style={{ marginRight: 4, height: "1.2em" }} />
                  <FormattedMessage id="ExtrinsicSuccess" />
                </div>
              ),
              ExtrinsicFailed: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Error style={{ marginRight: 4, height: "1.2em" }} />
                  <FormattedMessage id="ExtrinsicFailed" />
                </div>
              )
            }[data.status]
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
            handleChange={eventService.handleChange}
            loading={eventsData.loading}
            tableData={eventsData}
            tableProps={{ pagination: true, simpleMode: true }}
          />
        )}
      </div>
    </div>
  );
}
