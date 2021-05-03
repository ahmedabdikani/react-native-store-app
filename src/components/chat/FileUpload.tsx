import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { View } from "../theme";
import { Sizes } from "../../constants/Styles";
import Button from "../../components/button/Button";
import Layout from "../../constants/Layout";
import useThemeColor from "../../hooks/useThemeColor";
import useImagePicker from "../../hooks/useImagePicker";

const { height } = Layout.window;
const spacing = Sizes.spacing.s;

interface FileUploadProps {}

const FileUpload: React.FC<FileUploadProps> = ({}) => {
  const color = useThemeColor({}, "text");
  const { pickImage, snapImage } = useImagePicker();

  return (
    <View card style={styles.container}>
      <Button
        onPress={() => {
          pickImage()
            .then(() => {})
            .catch((error) => console.log(error));
        }}
        style={styles.btn}
      >
        <MaterialCommunityIcons name="image" size={35} color={color} />
      </Button>
      <Button
        style={styles.btn}
        onPress={() => {
          snapImage()
            .then(() => {})
            .catch((error) => console.log(error));
        }}
      >
        <MaterialCommunityIcons name="camera" size={35} color={color} />
      </Button>
      <Button style={styles.btn}>
        <MaterialCommunityIcons name="map-marker" size={35} color={color} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: spacing * 2,
    alignItems: "center",
    height: height / 2.5,
  },
  btn: {
    backgroundColor: "rgba(150,150,150,.3)",
    padding: spacing,
    borderRadius: spacing,
    marginHorizontal: spacing / 2,
  },
});

export default FileUpload;
