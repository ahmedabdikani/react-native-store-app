import * as React from "react";

import Avatar from "../Avatar";
import { View } from "../theme";
import Body2 from "../typography/Body2";
import { Sizes } from "../../constants/Styles";
import Center from "../center/Center";

const spacing = Sizes.base;

interface TextMessageProps {
  reverse?: boolean;
  message: any;
}

const TextMessage = ({ reverse, message }: TextMessageProps) => {
  return (
    <View
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
        margin: spacing,
      }}
    >
      <Avatar initial={message?.name} imageUri={message?.photoUrl} />
      <View
        card
        style={{
          marginLeft: reverse ? 0 : spacing,
          marginRight: !reverse ? 0 : spacing,
          borderRadius: spacing,
          padding: spacing,
        }}
      >
        <Center>
          <Body2>{message?.value}</Body2>
        </Center>
      </View>
    </View>
  );
};

export default TextMessage;
