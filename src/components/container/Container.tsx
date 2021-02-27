import styled from "styled-components";

import { Sizes } from "../../constants/Styles";
import Transparent from "../theme/Transparent";
import Layout from "../../constants/Layout";

const spacing = Sizes.base;
const { width } = Layout.window;

const Container = styled(Transparent)({ padding: spacing, flex: 1, width });

export default Container;
