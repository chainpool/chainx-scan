import React from "react";

export default function ExternalLink(props) {
  const { value } = props;

  let href = "";
  try {
    const url = new URL(`http://${value}`);
    href = url.href;
  } catch {}

  return href ? (
    <a className="nav-link" href={href} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  ) : (
    value
  );
}
