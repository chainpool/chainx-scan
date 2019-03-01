import React, { Component } from "react";
import "./index.scss";
import { fetchAndSetLatestBlocks } from "@store/action";
import { connect } from "react-redux";
import socket from "@src/io";
import { Table } from "../../../../../components";

class Blocks extends Component {
  componentDidMount() {
    this.props.updateBlocks();

    socket.emit("subscribe", "LATEST_BLOCKS_ROOM");
  }

  componentWillUnmount() {
    socket.emit("unsubscribe", "LATEST_BLOCKS_ROOM");
  }

  render() {
    const tableProps = {
      columns: [
        {
          title: "高度",
          dataIndex: "number"
        },
        {
          title: "验证人",
          dataIndex: "number",
          render: (value, item) => item.data.block.extrinsics[1]
        },
        {
          title: "交易数",
          dataIndex: "extrinsics"
        }
      ],
      dataSource: this.props.blocks
    };
    return (
      <div className="blocks">
        <header>最新区块列表</header>
        <Table {...tableProps} />
        <footer>查看全部 ></footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.latestBlocks
});

const mapDispatchToProps = dispatch => ({
  updateBlocks: () => dispatch(fetchAndSetLatestBlocks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blocks);
