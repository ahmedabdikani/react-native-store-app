import React from "react";

import { Body1 } from "./typography";

interface ErrorProps {
  error: string | undefined;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return error ? <Body1 style={{ color: "#df4759" }}>{error}</Body1> : null;
};

export default Error;
