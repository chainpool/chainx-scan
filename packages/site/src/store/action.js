import { fetchLatestBlocks, fetchLatestTransactions } from "./service";

export const setLatestBlocks = blocks => ({
  type: "SET_LATEST_BLOCKS",
  blocks
});

export const fetchAndSetLatestBlocks = () => {
  return function(dispatch) {
    fetchLatestBlocks().then(resp => {
      dispatch(setLatestBlocks(resp.items));
    });
  };
};

export const setLatestTransactions = transactions => ({
  type: "SET_LATEST_TRANSACTIONS",
  transactions
});

export const fetchAndSetLatestTransactions = () => {
  return function(dispatch) {
    fetchLatestTransactions().then(resp => {
      dispatch(setLatestTransactions(resp.items));
    });
  };
};
