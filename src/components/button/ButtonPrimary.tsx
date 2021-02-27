import styled from "styled-components";

import Button from "./Button";
import { tintColorLight } from "../../constants/Colors";
import { Sizes } from "../../constants/Styles";

const spacing = Sizes.base;

const ButtonPrimary = styled(Button)({
  backgroundColor: tintColorLight,
  padding: spacing,
  justifyContent: "center",
  alignItems: "center",
});

export default ButtonPrimary;
