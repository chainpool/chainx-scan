const endpoint = process.env.REACT_APP_SERVER;

export async function fetchLatestBlocks() {
  return window.fetch(endpoint + "/blocks").then(response => {
    return response.json();
  });
}
