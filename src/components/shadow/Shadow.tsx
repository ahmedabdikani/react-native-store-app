import styled from "styled-components";

import { View } from "../theme";

const Shadow = styled(View).attrs((props) => ({ card: true }))`
  elevation: 10;
  z-index: 10;
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  shadow-color: #ddd;
`;
export default Shadow;
