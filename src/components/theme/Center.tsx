import styled from "styled-components";

import View from "./View";

const Center = styled(View).attrs((props) => ({ transparent: true }))`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Center;
