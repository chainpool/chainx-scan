const pageBlocks = (state = [], action) => {
  if (action.type === "SET_PAGE_BLOCKS") {
    return action.blocks;
  }

  return state;
};

export default pageBlocks;
