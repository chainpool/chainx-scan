const latestTransactions = (state = [], action) => {
  if (action.type === "") {
    return action.transactions;
  }

  return state;
};

export default latestTransactions;
