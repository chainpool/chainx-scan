import React from "react";

import DashBoard from "./DashBoard";
import BtcStatus from "./BtcStatus";
import BestBlocks from "./BestBlocks";
import BestTransactions from "./BestTransactions";
import ReferendumResult from "./ReferendumResult";
import Warning from "./Warning";
export default function Home() {
  return (
    <section className="blockTransaction">
      <Warning />
      <DashBoard />
      <div className="columns">
        <div className="column">
          <BestBlocks />
        </div>
        <div className="column">
          <BestTransactions />
        </div>
        <div className="column">
          <ReferendumResult />
        </div>
      </div>
      <BtcStatus />
    </section>
  );
}
