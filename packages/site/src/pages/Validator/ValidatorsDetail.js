import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { hexAddPrefix, hexStripPrefix } from "@polkadot/util";

import {
  ExternalLink,
  AddressLink,
  ValidatorIndex,
  PanelList,
  Breadcrumb,
  AntSpinner as Spinner,
  Amount,
  NumberFormat,
  NoData
} from "../../components";
import NominationsList from "./NominationsList";
import DetailMissedBlock from "./DetailMissedBlock";
import SettingList from "./SettingList";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function ValidatorsDetail(props) {
  const {
    match: {
      params: { node, filter }
    }
  } = props;

  const [data, setData] = useState({});
  const [activeKey, setActiveKey] = useState("trust");
  let nodeId = void 0;
  try {
    nodeId = hexAddPrefix(node);
  } catch {}

  useEffect(() => {
    if (!!nodeId) {
      const subscription = api.fetchValidatorDetail$(nodeId).subscribe(data => setData(data), data => setData(data));
      return () => subscription.unsubscribe();
    }
  }, [nodeId]);

  const breadcrumb = () => {
    if (!!nodeId && !!data) {
      if (filter === "unsettled") {
        return (
          <Breadcrumb
            dataSource={[
              { to: "/validators/unsettled", label: <FormattedMessage id="STANDBYNODE" /> },
              { label: <FormattedMessage id="INTENTIONDETAILS" /> }
            ]}
          />
        );
      } else if (filter === "all") {
        return (
          <Breadcrumb
            dataSource={[
              { to: "/validators", label: <FormattedMessage id="TRUSTEENODE" /> },
              { label: <FormattedMessage id="INTENTIONDETAILS" /> }
            ]}
          />
        );
      } else if (filter === "detail") {
        if (!data.isValidator) {
          return (
            <Breadcrumb
              dataSource={[
                { to: "/validators/unsettled", label: <FormattedMessage id="STANDBYNODE" /> },
                { label: <FormattedMessage id="INTENTIONDETAILS" /> }
              ]}
            />
          );
        } else {
          return (
            <Breadcrumb
              dataSource={[
                { to: "/validators", label: <FormattedMessage id="TRUSTEENODE" /> },
                { label: <FormattedMessage id="INTENTIONDETAILS" /> }
              ]}
            />
          );
        }
      } else {
        return (
          <Breadcrumb
            dataSource={[
              { to: `/validators/${filter}`, label: <FormattedMessage id="TRUSTEE" /> },
              { label: <FormattedMessage id="INTENTIONDETAILS" /> }
            ]}
          />
        );
      }
    } else {
      return <></>;
    }
  };
  if (!!nodeId && !data.code && data.name === undefined) {
    return (
      <>
        {breadcrumb()}
        <div style={{ paddingTop: "30%" }}>
          <Spinner />
        </div>
      </>
    );
  } else if (!nodeId) {
    return <NoData id={node} />;
  } else if (!!data.code) {
    return <NoData id={nodeId} />;
  }

  return (
    <div>
      {breadcrumb()}
      <PanelList
        dataSource={[
          {
            label: <FormattedMessage id="RANKING" />,
            data: (
              <>
                <ValidatorIndex value={data.name} />
                {!!data.isTrustee && data.isTrustee.length <= 0 ? (
                  ""
                ) : (
                  <span className="table-tag-trust">
                    <FormattedMessage id="TRUSTEE" />
                  </span>
                )}
              </>
            )
          },
          {
            label: <FormattedMessage id="NAME" />,
            data: (
              <>
                {data.name}
                {!data.isActive && (
                  <span className="table-tag-nagtive">
                    (<FormattedMessage id="INACTIVE" />)
                  </span>
                )}
              </>
            )
          },
          {
            label: <FormattedMessage id="WEBSITE" />,
            data: <ExternalLink value={data.url} />
          },
          {
            label: <FormattedMessage id="ACCOUNTADDRESS" />,
            data: <AddressLink value={data.accountid} isActive className="text-truncate" />
          },
          {
            label: <FormattedMessage id="BLOCKAUTHORINGADDRESS" />,
            data: <AddressLink value={data.sessionKey} isActive className="text-truncate" />
          },
          {
            label: <FormattedMessage id="JACKPOTADDRESS" />,
            data: <AddressLink value={data.jackpotAddress} isActive className="text-truncate" />
          },
          {
            label: <FormattedMessage id="SELFBONDED" />,
            data: <Amount value={data.selfVote} />
          },
          {
            label: <FormattedMessage id="TOTALNOMINATION" />,
            data: <Amount value={data.totalNomination} />
          },
          {
            label: <FormattedMessage id="JACKPOTBALANCE" />,
            data: <Amount value={data.jackpot} />
          },
          {
            label: <FormattedMessage id="MISSEDBLOCKS" />,
            data: (
              <span>
                <NumberFormat value={data.missedBlocks} />
                <span>{`(${(isNaN(data.missedBlocks / (data.missedBlocks + data.blocks))
                  ? 0
                  : (data.missedBlocks / (data.missedBlocks + data.blocks)) * 100
                ).toFixed(2)}%)`}</span>
              </span>
            )
          },
          {
            label: <FormattedMessage id="AUTHOREDBLOCKS" />,
            data: <NumberFormat value={data.blocks} />
          },
          {
            label: <FormattedMessage id="VOTEWEIGHTLATESTUPDATE" />,
            data: data.lastTotalVoteWeightUpdate
          },
          {
            label: <FormattedMessage id="WEIGHT" />,
            data: data.lastTotalVoteWeight
          }
        ]}
      />
      <div className="box">
        <div className="tabs">
          <ul>
            <li onClick={() => setActiveKey("trust")} className={classnames({ "is-active": activeKey === "trust" })}>
              <a>
                <FormattedMessage id="TRUSTEESETTINGS" />
              </a>
            </li>
            <li onClick={() => setActiveKey("vote")} className={classnames({ "is-active": activeKey === "vote" })}>
              <a>
                <FormattedMessage id="NOMINATORS" />
              </a>
            </li>
            <li onClick={() => setActiveKey("miss")} className={classnames({ "is-active": activeKey === "miss" })}>
              <a>漏块列表</a>
            </li>
          </ul>
        </div>
        <>
          {activeKey === "trust" && <SettingList nodeID={nodeId} />}
          {activeKey === "vote" && <NominationsList nodeID={nodeId} />}
          {activeKey === "miss" && <DetailMissedBlock nodeId={hexStripPrefix(data.accountid)} />}
        </>
      </div>
    </div>
  );
}
