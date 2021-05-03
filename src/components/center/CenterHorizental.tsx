import styled from "styled-components";

import View from "../theme/View";

const Center = styled(View).attrs((props) => ({ transparent: true }))`
  flex: 1;
  align-items: center;
`;

export default Center;
