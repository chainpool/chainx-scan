import React, { useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import hexAddPrefix from "@polkadot/util/hex/addPrefix";
import { NavLink } from "react-router-dom";
import { BlockLink, ValidatorLink, DateShow, PanelList, Breadcrumb, AntSpinner as Spinner } from "../../components";
import { RenderTxsList } from "../Txs/TxsList";
import Events from "../Events";
import api from "../../services/api";
import { NoData } from "../../components";
import { FormattedMessage } from "react-intl";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";

export default function BlockDetail(props) {
  const { match } = props;
  const [blocks, setBlock] = useState([]);
  const [data, setData] = useState({});

  const [activeKey, setActiveKey] = useState("txs");
  let blockId = void 0;
  if (/^\d*$/.test(match.params.block) || /^\D*$/.test(match.params.block)) {
    blockId = match.params.block;
  } else {
    try {
      blockId = hexAddPrefix(match.params.block);
    } catch {}
  }
  const blockNumber = data.number;
  const hasNext = blocks.length > 0 && data.number && blocks[0].number >= data.number + 1;
  const [{ tableData: txsTableData }, setTxsData] = useRedux(`txs_${blockId}`, {
    tableData: {
      loading: true,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  });
  const txTableService = useMemo(() => new TableService(api.fetchTxs$, txsTableData, { block: blockNumber }), [
    blockNumber
  ]);
  useEffect(() => {
    if (!!blockId) {
      const subscription = api.fetchBlockDetail$(blockId).subscribe(data => setData(data), data => setData(data));
      return () => subscription.unsubscribe();
    }
  }, [blockId]);

  useEffect(() => {
    if (!!blockId) {
      const subscription = api.fetchLatestBlocks$(blockId).subscribe(blocks => setBlock(blocks));
      return () => subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (!!blockNumber) {
      const subscription = txTableService.fetchTable$().subscribe(data => {
        setTxsData({ tableData: data });
      });
      return () => subscription.unsubscribe();
    }
  }, [blockNumber]);

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: "/blocks", label: <FormattedMessage id="BLOCKS" /> },
        { label: <FormattedMessage id="BLOCKDETAILS" /> }
      ]}
    />
  );
  if (!!blockId && !data.code && !data.number) {
    return (
      <>
        {breadcrumb}
        <div style={{ padding: "10%" }}>
          <Spinner />
        </div>
      </>
    );
  } else if (!blockId) {
    return <NoData id={match.params.block} />;
  } else if (!!data.code) {
    return <NoData id={blockId} />;
  }
  return (
    <div>
      {breadcrumb}
      <div className="switch-block">
        <NavLink to={`/blocks/${!!data && data.number - 1}`}>
          <i className="iconfont icon-left" />
        </NavLink>
        <FormattedMessage id="HEIGHT" />:{!!data && data.number}
        <NavLink to={hasNext ? `/blocks/${!!data && data.number + 1}` : `/blocks/${!!data && data.number}`}>
          <i className={classnames({ forbidden: !hasNext }, "iconfont icon-right")} />
        </NavLink>
      </div>
      <PanelList
        dataSource={[
          {
            label: <FormattedMessage id="HEIGHT" />,
            data: <BlockLink value={data.number} />
          },
          {
            label: <FormattedMessage id="BLOCKHASH" />,
            data: <BlockLink value={data.hash} />
          },
          {
            label: <FormattedMessage id="PARENTHASH" />,
            data: <BlockLink value={data.parent_hash} />
          },
          {
            label: <FormattedMessage id="TRIEROOT" />,
            data: data.state_root
          },
          {
            label: <FormattedMessage id="EXTRINSICROOT" />,
            data: data.extrinsics_root
          },
          {
            label: <FormattedMessage id="BLOCKTIME" />,
            data: <DateShow value={data.time} format="YYYY-MM-DD HH:mm:ss" />
          },
          {
            label: <FormattedMessage id="VALIDATOR" />,
            data: <ValidatorLink value={data.producer} />
          }
        ]}
      />
      <div className="box">
        <div className="tabs">
          <ul>
            <li onClick={() => setActiveKey("txs")} className={classnames({ "is-active": activeKey === "txs" })}>
              <a>
                <FormattedMessage id="EXTRINSICS" />
              </a>
            </li>
            <li onClick={() => setActiveKey("events")} className={classnames({ "is-active": activeKey === "events" })}>
              <a>
                <FormattedMessage id="EVENTS" />
              </a>
            </li>
          </ul>
        </div>
        {data && data.number && activeKey === "txs" && (
          <RenderTxsList
            handleChange={txTableService.handleChange}
            tableData={{ ...txsTableData }}
            tableProps={{ pagination: txsTableData.pagination, simpleMode: true, loading: txsTableData.loading }}
          />
        )}
        {data && data.number && activeKey === "events" && (
          <Events tableProps={{ simpleMode: true, pagination: { pageSize: 10 } }} block={data.number} />
        )}
      </div>
    </div>
  );
}
