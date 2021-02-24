import styled from "styled-components";

import { Sizes } from "../../constants/Styles";
import Transparent from "../theme/Transparent";

const spacing = Sizes.base;

const Container = styled(Transparent)`
  padding: ${spacing}px;
`;

export default Container;
