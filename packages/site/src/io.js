import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER);

socket.on("latestBlocks", data => {
  // TODO: update store
  console.log(data);
});

export default socket;
