const latestTransactions = (state = [], action) => {
  if (action.type === "SET_LATEST_TRANSACTIONS") {
    return action.transactions;
  }

  return state;
};

export default latestTransactions;
