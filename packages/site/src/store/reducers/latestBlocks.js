const latestBlocks = (state = [], action) => {
  if (action.type === "SET_LATEST_BLOCKS") {
    return action.blocks;
  }

  return state;
};

export default latestBlocks;
