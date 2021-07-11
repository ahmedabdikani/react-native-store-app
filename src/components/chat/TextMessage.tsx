import React from "react";

import Avatar from "../Avatar";
import { View } from "../theme";
import Body2 from "../typography/Body2";
import { Sizes } from "../../constants/Styles";
import Center from "../center/Center";
import useThemeColor from "../../hooks/useThemeColor";
import { white } from "../../constants/Colors";

const spacing = Sizes.spacing.s;

interface TextMessageProps {
  reverse?: boolean;
  message: any;
  maskElement: boolean;
}

const TextMessage = ({ reverse, message, maskElement }: TextMessageProps) => {
  const backgroundColor = useThemeColor({}, "card");
  const text = useThemeColor({}, "text");

  return (
    <View
      transparent
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
        margin: spacing,
        zIndex: 10,
      }}
    >
      <Avatar initial={message?.name} imageUri={message?.photoUrl} />
      <View
        card
        style={{
          maxWidth: "60%",
          minWidth: 40,
          marginLeft: reverse ? 0 : spacing,
          marginRight: !reverse ? 0 : spacing,
          borderRadius: spacing,
          padding: spacing,
          backgroundColor: reverse
            ? maskElement
              ? "red"
              : "transparent"
            : backgroundColor,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Body2 style={{ color: !reverse ? text : white }}>
          {message?.value}
        </Body2>
      </View>
    </View>
  );
};

export default TextMessage;
