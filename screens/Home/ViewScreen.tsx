import * as React from "react";
import { Image, ImageBackground, Pressable } from "react-native";

import { View } from "../../components/Themed";
import Layout from "../../constants/Layout";

const { width, height } = Layout.window;

interface IViewScreenProps {
  navigation;
  route;
}

const ViewScreen = ({ navigation, route }: IViewScreenProps) => {
  return (
    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: route.params.imageUri }}
          style={{
            width,
            height: height / 1.7,
            resizeMode: "cover",
          }}
        />
      </View>
    </Pressable>
  );
};
export default ViewScreen;
