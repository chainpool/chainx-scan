const endpoint = process.env.REACT_APP_SERVER;

export default function fetch(path, params = {}) {
  const paramsKeyConvert = (str = "") => str.replace(/[A-Z]/g, ([s]) => `_${s.toLowerCase()}`);

  const url = new URL(path, endpoint);
  for (const key of Object.keys(params)) {
    url.searchParams.set(paramsKeyConvert(key), params[key]);
  }
  return window.fetch(url).then(response => response.json());
}
