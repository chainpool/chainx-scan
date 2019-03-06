import { useState, useEffect } from "react";
import socket from "./io";

export default function useSubcribe(name, eventName) {
  const [data, setData] = useState([]);

  function unsubscribe() {
    socket.removeListener(eventName);
    socket.emit("unsubscribe", name);
  }

  function subcribe() {
    socket.emit("subscribe", name);
  }

  useEffect(() => {
    subcribe();
    socket.on("latestBlocks", items => {
      setData(items || []);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return [data, unsubscribe];
}
