import styled from "styled-components";

import Card from "../theme/Card";

const Shadow = styled(Card)({
  elevation: 10,
  zIndex: 10,
  shadowOpacity: 0.5,
  shadowRadius: 5,
  shadowColor: "#ddd",
});
export default Shadow;
