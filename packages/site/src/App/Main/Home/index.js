import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAndSetLatestBlocks } from "@store/action";

class Home extends Component {
  componentDidMount() {
    this.props.updateBlocks();
  }

  render() {
    return <div>home</div>;
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
)(Home);
