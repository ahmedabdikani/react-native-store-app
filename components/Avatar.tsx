import * as React from "react";
import { Image } from "react-native";

import { Fonts } from "../constants/Styles";
import { CardView, Text, useThemeColor } from "./Themed";

interface IAvatarProps {
  imageUri?: string;
  initial?: string;
  backgroundColor?: string;
}

const Avatar = ({
  imageUri,
  initial,
  backgroundColor = useThemeColor({}, "card"),
}: IAvatarProps) => {
  return (
    <CardView
      style={{
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            resizeMode: "cover",
          }}
        />
      ) : (
        <Text style={Fonts.body1}>
          {initial?.toLocaleUpperCase().trim().substr(0, 2)}
        </Text>
      )}
    </CardView>
  );
};
export default Avatar;
