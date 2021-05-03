import styled from "styled-components";

import View from "../theme/View";

const Center = styled(View).attrs((props) => ({ transparent: true }))`
  flex: 1;
  justify-content: center;
`;

export default Center;
