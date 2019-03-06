import { useState, useEffect } from "react";
import socket from "./io";

export default function useSubcribe(name, extra = {}) {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState([]);

  function unsubscribe() {
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
