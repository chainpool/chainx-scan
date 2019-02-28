import { fetchLatestBlocks } from "./service";

export const setLatestBlocks = blocks => ({
  type: "SET_LATEST_BLOCKS",
  blocks: blocks
});

export const fetchAndSetLatestBlocks = () => {
  return function(dispatch) {
    fetchLatestBlocks().then(resp => {
      dispatch(setLatestBlocks(resp.items));
    });
  };
};
