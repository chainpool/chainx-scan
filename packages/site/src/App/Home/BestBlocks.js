import React, { PureComponent } from 'react';
import { fetchAndSetLatestBlocks } from '@store/action';
import { connect } from 'react-redux';

import { BlockLink, AddressLink } from '../../components';
import socket from '../../io';

class Blocks extends PureComponent {
  componentDidMount() {
    this.props.updateBlocks();

    socket.emit('subscribe', 'LATEST_BLOCKS_ROOM');
  }

  componentWillUnmount() {
    socket.emit('unsubscribe', 'LATEST_BLOCKS_ROOM');
  }

  render() {
    return (
      <section className="panel">
        <div className="panel-heading">最新区块列表</div>
        <div className="panel-block">
          <table className="table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>高度</th>
                <th>验证人</th>
                <th>交易数</th>
              </tr>
            </thead>
            <tbody>
              {this.props.blocks.map(({ number, data, extrinsics }) => (
                <tr key={number}>
                  <td>
                    <BlockLink value={number} />
                  </td>
                  <td>
                    <AddressLink value={data.block.extrinsics[1]} />
                  </td>
                  <td>{extrinsics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel-block">
          <a className="is-link">查看全部</a>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.latestBlocks,
});

const mapDispatchToProps = dispatch => ({
  updateBlocks: () => dispatch(fetchAndSetLatestBlocks()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blocks);
