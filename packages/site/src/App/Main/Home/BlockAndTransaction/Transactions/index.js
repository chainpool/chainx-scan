import React, { Component } from "react";
import "./index.scss";
import { fetchAndSetLatestTransactions } from "@store/action";
import { connect } from "react-redux";

class Blocks extends Component {
  componentDidMount() {
    this.props.updateTransactions();
  }

  render() {
    return (
      <div className="transactions">
        <header>最新交易列表</header>
        <table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>交易哈希</th>
              <th style={{ width: "50%" }}>发送人</th>
              <th style={{ width: "30%" }}>操作</th>
            </tr>
            {this.props.transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.number}</td>
                <td>{tx.module}</td>
                <td>{tx.index}</td>
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
  transactions: state.latestTransactions
});

const mapDispatchToProps = dispatch => ({
  updateTransactions: () => dispatch(fetchAndSetLatestTransactions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blocks);
