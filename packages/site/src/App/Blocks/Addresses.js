import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchAndSetPageBlocks } from "@store/action";
import PageBlocksTable from "./PageBlocksTable";
class Addresses extends PureComponent {
  render() {
    return (
      <div>
        <PageBlocksTable />
      </div>
    );
  }
}
export default Addresses;
