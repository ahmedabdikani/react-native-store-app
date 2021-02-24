import styled from "styled-components";

import Text from "./Text";
import { tintColorLight } from "../../constants/Colors";

const TextTintColored = styled(Text)`
  color: ${tintColorLight};
`;

export default TextTintColored;
