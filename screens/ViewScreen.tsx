import * as React from "react";
import { Image, ImageBackground, Pressable } from "react-native";

import { View } from "../components/Themed";
import Layout from "../constants/Layout";

const { width, height } = Layout.window;

interface IViewScreenProps {
  navigation;
  route;
}

const ViewScreen = ({ navigation, route }: IViewScreenProps) => {
  return (
    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: route.params.imageUri }}
        blurRadius={20}
        style={{
          width,
          height: height * 1.2,
          backgroundColor: "#000",
          justifyContent: "center",
          flex: 1,
        }}
        resizeMode="stretch"
      >
        <Image
          source={{ uri: route.params.imageUri }}
          style={{
            width: "100%",
            minHeight: "60%",
            resizeMode: "contain",
          }}
          resizeMethod={"auto"}
        />
      </ImageBackground>
    </Pressable>
  );
};
export default ViewScreen;
