import * as React from "react";
import { Image, StyleSheet } from "react-native";

import { Styles } from "../constants/Styles";
import { Card } from "./theme";
import useThemeColor from "../hooks/useThemeColor";
import { Subtitle1 } from "./typography";

interface AvatarProps {
  imageUri?: string;
  initial?: string;
  backgroundColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  imageUri,
  initial,
  backgroundColor = useThemeColor({}, "card"),
}) => {
  return (
    <Card style={[styles.container, { backgroundColor: backgroundColor }]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.img} />
      ) : (
        <Subtitle1 style={{ textTransform: "uppercase" }}>
          {initial?.trim().toUpperCase().substr(0, 2)}
        </Subtitle1>
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
