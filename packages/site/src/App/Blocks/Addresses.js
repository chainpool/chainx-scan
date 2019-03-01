import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchAndSetPageBlocks } from "@store/action";
class Addresses extends PureComponent {
  componentDidMount() {
    this.props.fetchAndSetPageBlocks(1, 20).then(res => {
      console.log(this.props.state);
      console.log(res, "============");
    });
  }
  render() {
    const { pageBlocks: { blocks = [] } = {} } = this.props;
    return (
      <div>
        <table className="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>账户地址</th>
              <th>PCX 总余额</th>
              <th>BTC 总余额</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((item, index) => {
              return (
                <tr key={index}>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
  pageBlocks: state.pageBlocks
});

const mapDispatchToProps = dispatch => ({
  fetchAndSetPageBlocks: (page, pageSize) =>
    dispatch(fetchAndSetPageBlocks(page, pageSize))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Addresses);
