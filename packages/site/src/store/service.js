const endpoint = process.env.REACT_APP_SERVER;

export async function fetchLatestBlocks() {
  return window.fetch(endpoint + "/blocks").then(response => {
    return response.json();
  });
}

export async function fetchLatestTransactions() {
  return window.fetch(endpoint + "/txs").then(response => {
    return response.json();
  });
}

export async function fetchPageBlocks(...args) {
  const [page, pageSize] = args;
  return window
    .fetch(endpoint + `/blocks?page=${page}&page_size=${pageSize}`)
    .then(response => {
      return response.json();
    });
}
