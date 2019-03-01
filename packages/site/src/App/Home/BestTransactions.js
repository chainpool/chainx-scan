import React, { PureComponent } from "react";
import { fetchAndSetLatestTransactions } from "@store/action";
import { connect } from "react-redux";

import { TxLink, AddressLink } from "../../components";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";

class Blocks extends PureComponent {
  componentDidMount() {
    this.props.updateTransactions();
  }

  render() {
    return (
      <section className="panel">
        <div className="panel-heading">最新交易列表</div>
        <div className="panel-block">
          <table className="table is-striped is-fullwidth data-table">
            <thead>
              <tr>
                <th>交易哈希</th>
                <th>发送人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {this.props.transactions.map((tx, index) => (
                <tr key={index}>
                  <td>
                    <TxLink value={tx.number} />
                  </td>
                  <td>
                    <AddressLink value={tx.number} />
                  </td>
                  <td>{tx.index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="panel-block panel-footer-link"
          style={{ justifyContent: "center" }}
        >
          <a class="view-more">
            查看全部
            <IconChevronRight />
          </a>
        </div>
      </section>
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
