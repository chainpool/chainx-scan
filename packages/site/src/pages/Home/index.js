import React from "react";

import DashBoard from "./DashBoard";
import BtcStatus from "./BtcStatus";
import BestBlocks from "./BestBlocks";
import BestTransactions from "./BestTransactions";

export default function Home() {
  return (
    <section className="blockTransaction">
      <DashBoard />
      <BtcStatus />
      <div className="columns">
        <div className="column">
          <BestBlocks />
        </div>
        <div className="column">
          <BestTransactions />
        </div>
      </div>
    </section>
  );
}
