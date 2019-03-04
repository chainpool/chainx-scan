import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchAndSetPageBlocks } from "@store/action";
import { Table } from "../../components";
class PageBlocksTable extends PureComponent {
  componentDidMount() {
    this.props.fetchAndSetPageBlocks(1, 20);
  }
  render() {
    const { pageBlocks: { blocks = [] } = {} } = this.props;
    const tableProps = {
      dataSource: blocks,
      columns: [
        {
          title: "区块高度",
          dataIndex: "number"
        },
        {
          title: "区块哈希",
          ellipse: true,
          dataIndex: "hash"
        },
        {
          title: "父哈希",
          ellipse: true,
          dataIndex: "parent_hash"
        },
        {
          title: "默克尔根",
          ellipse: true,
          dataIndex: "state_root"
        },
        {
          title: "区块时间",
          dataIndex: ""
        },
        {
          title: "bits",
          dataIndex: ""
        },
        {
          title: "中继人",
          dataIndex: ""
        },
        {
          title: "中继提交时间",
          dataIndex: ""
        }
      ]
    };
    return <Table {...tableProps} />;
  }
}

const mapStateToProps = state => ({
  pageBlocks: state.pageBlocks
});

const mapDispatchToProps = dispatch => ({
  fetchAndSetPageBlocks: (page, pageSize) =>
    dispatch(fetchAndSetPageBlocks(page, pageSize))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageBlocksTable);
