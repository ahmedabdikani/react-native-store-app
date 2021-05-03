import styled from "styled-components";

import { Sizes } from "../constants/Styles";
import View from "./theme/View";

const Container = styled(View)`
  background-color: transparent;
  padding: ${Sizes.spacing.s};
`;

export default Container;
