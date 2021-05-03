import React from "react";
import { Image, StyleSheet } from "react-native";

import { Styles } from "../constants/Styles";
import { View } from "./theme";
import { Subtitle1 } from "./typography";

interface AvatarProps {
  imageUri?: string;
  initial?: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUri, initial }) => {
  return (
    <View card style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.img} />
      ) : (
        <Subtitle1 style={{ textTransform: "uppercase" }}>
          {initial?.trim().toUpperCase().substr(0, 2)}
        </Subtitle1>
      )}
    </View>
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
