import React, { Component } from 'react';
import { fetchAndSetLatestTransactions } from '@store/action';
import { connect } from 'react-redux';

class Blocks extends Component {
  componentDidMount() {
    this.props.updateTransactions();
  }

  render() {
    return (
      <section className="panel">
        <div className="panel-heading">最新交易列表</div>
        <div className="panel-block">
          <table className="table is-striped is-narrow is-hoverable is-fullwidth">
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
                  <td>{tx.number}</td>
                  <td>{tx.module}</td>
                  <td>{tx.index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="panel-block">
          <a class="is-link">查看全部</a>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.latestTransactions,
});

const mapDispatchToProps = dispatch => ({
  updateTransactions: () => dispatch(fetchAndSetLatestTransactions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blocks);
