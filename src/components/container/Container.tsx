import styled from "styled-components";

import { Sizes } from "../../constants/Styles";
import View from "../theme/View";
import Layout from "../../constants/Layout";

const spacing = Sizes.spacing.s;
const { width } = Layout.window;

const Container = styled(View).attrs((props) => ({ transparent: true }))({
  padding: spacing,
  flex: 1,
  width,
});

export default Container;
