const pageBlocks = (state = {}, action) => {
  if (action.type === "SET_PAGE_BLOCKS") {
    const { blocks, page, pageMax } = action;
    return {
      blocks,
      page,
      pageMax
    };
  }

  return state;
};

export default pageBlocks;
