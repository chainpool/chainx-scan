import React, { Component } from "react";
import Blocks from "./Blocks";
import Transactions from "./Transactions";
import "./index.scss";

class BlockAndTransaction extends Component {
  render() {
    return (
      <section className="blockTransaction">
        <Blocks />
        <Transactions />
      </section>
    );
  }
}

export default BlockAndTransaction;
