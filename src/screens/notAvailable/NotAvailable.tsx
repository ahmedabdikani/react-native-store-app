import * as React from "react";

import { View } from "../../components/theme";
import Center from "../../components/center/Center";
import { Subtitle1 } from "../../components/typography";

interface NotAvailableProps {}

const NotAvailable: React.FC<NotAvailableProps> = ({}) => {
  return (
    <View style={{ flex: 1 }}>
      <Center>
        <Subtitle1 secondary>service is not available at the moment</Subtitle1>
      </Center>
    </View>
  );
};
export default NotAvailable;
