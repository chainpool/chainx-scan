import React from "react";

import { useAppContext } from "./AppContext";

export default function VilidatorLink({ value, style, className }) {
  const [{ intentions = [] }] = useAppContext();
  const index = intentions.findIndex(({ name }) => name === value);
  return <span className="nowrap">{index + 1}</span>;
}
