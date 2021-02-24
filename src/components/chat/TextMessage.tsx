import * as React from "react";

import Avatar from "../Avatar";
import { Card, View } from "../theme";
import Body2 from "../typography/Body2";
import { Sizes } from "../../constants/Styles";
import Center from "../theme/Center";

const spacing = Sizes.base;

interface TextMessageProps {
  reverse?: boolean;
  message: any;
}

const TextMessage = ({ reverse, message, sender }: TextMessageProps) => {
  console.log(message);
  return (
    <View
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
        margin: spacing,
      }}
    >
      <Avatar initial={sender?.name} imageUri={sender?.photoUrl} />
      <Card
        style={{
          marginLeft: reverse ? 0 : spacing,
          marginRight: !reverse ? 0 : spacing,
          borderRadius: spacing,
          padding: spacing,
        }}
      >
        <Center>
          <Body2>{message?.message?.value}</Body2>
        </Center>
      </Card>
    </View>
  );
};

export default TextMessage;
