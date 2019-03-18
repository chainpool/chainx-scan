import { useState, useEffect } from "react";
import api from "../services/api";

export default function useSubcribe(name, eventName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscription = api.createObservable(name, eventName).subscribe(result => {
      setData(result || []);
    });
    return () => subscription.unsubscribe();
  }, []);

  return [data];
}
