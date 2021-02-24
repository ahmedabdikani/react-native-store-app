import * as React from "react";
import { Image, StyleSheet } from "react-native";

import { Fonts, Styles } from "../constants/Styles";
import { Card, Text } from "./theme";
import useThemeColor from "../hooks/useThemeColor";

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
    <Card style={[styles.container, { backgroundColor: backgroundColor }]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.img} />
      ) : (
        <Text style={Fonts.body1}>
          {initial?.toLocaleUpperCase().trim().substr(0, 2)}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    ...Styles.centerHV,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
});

export default Avatar;
