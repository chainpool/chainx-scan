import React from "react";

import BestBlocks from "./BestBlocks";
import BestTransactions from "./BestTransactions";

export default function Home() {
  return (
    <section className="blockTransaction">
      <BestBlocks />
      <BestTransactions />
    </section>
  );
}
