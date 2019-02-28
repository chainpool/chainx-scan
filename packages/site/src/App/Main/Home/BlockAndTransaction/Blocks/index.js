import React, { Component } from "react";
import "./index.scss";
import { fetchAndSetLatestBlocks } from "@store/action";
import { connect } from "react-redux";

class Blocks extends Component {
  componentDidMount() {
    this.props.updateBlocks();
  }

  render() {
    console.log(this.props.blocks);
    return (
      <div className="blocks">
        <header>最新区块列表</header>
        <table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>高度</th>
              <th style={{ width: "50%" }}>验证人</th>
              <th style={{ width: "30%" }}>交易数</th>
            </tr>
            {this.props.blocks.map((block, index) => (
              <tr key={index}>
                <td>{block.number}</td>
                <td>{block.data.block.extrinsics[1]}</td>
                <td>{block.extrinsics}</td>
              </tr>
            ))}
          </thead>
        </table>
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
