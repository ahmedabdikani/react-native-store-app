import * as React from "react";

import H4 from "./typography/H4";

interface ErrorProps {
  error: string | undefined;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return error ? <H4 style={{ color: "#df4759" }}>{error}</H4> : null;
};

export default Error;
