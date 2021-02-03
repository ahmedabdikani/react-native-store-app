import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useTheme } from "@react-navigation/native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useQuery } from "react-query";
import axios from "axios";

import { Text, useThemeColor, View } from "../../components/Themed";
import Colors, { darkYellow, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import MiniAppsContainer from "../../components/MiniAppContainer";
import Advertisment from "../../components/Advertisment";
import Product from "../../components/ProductItem";
import Products from "../../components/ProductList";
import useAxios from "../../hooks/useAxiosFetch";
import { HomeStackPramList } from "../../types";
import { Product as product } from "../../Types/Product";

const { width, height } = Layout.window;
const padding = 10;
const searchHeight = 40;

const getImages = (index: number): string[] => {
  return Array.from(
    { length: 5 },
    (_, i) => "https://source.unsplash.com/random/" + (i + 1) * index
  );
};
export const products: product[] = Array.from({ length: 10 }, (_, i) => ({
  id: Math.random() * 100000,
  title:
    "officiis magnam consectetur. Quae suscipit sed excepturi ad praesentium odit corrupti voluptates esse quasi consequuntur, minus ipsa.",
  price: (Math.floor(Math.random() * 400) + 103).toString(),

  images: getImages(i + 1),
  category: "",
  description: "",
}));
const fetchProducts = async () => {
  const { data, status } = await axios.get("https://fakestoreapi.com/products");

  if (status === 200) {
    console.log(status);
    data.image = []; //getImages(200);
    return Promise.resolve(data);
  }
};

interface IHomeProps {
  navigation: NavigationProp<HomeStackPramList, "Home">;
}

const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();

  React.useEffect(() => {});

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "transparent", height: top }} />
      <View style={{ backgroundColor: "transparent" }}>
        <View
          style={{
            backgroundColor: "transparent",
            // flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: padding,
          }}
        >
          <Header />
        </View>
      </View>
      <ScrollView
        style={{}}
        contentContainerStyle={{
          padding,
          // paddingTop: padding,
          marginTop: padding * 3,
          borderRadius: padding * 3,
          overflow: "hidden",
          backgroundColor: useThemeColor({}, "background"),
        }}
      >
        <View>
          <MiniAppsContainer colors={colors} />
        </View>
        <Advertisment />
        <View style={{ marginTop: padding }}>
          <Products navigation={navigation} products={products} />
        </View>
      </ScrollView>
    </View>
  );
};

const Header = () => {
  return (
    <View>
      <View style={styles.searchArea}>
        <TextInput
          style={{ flex: 1, color: useThemeColor({}, "text") }}
          placeholderTextColor={useThemeColor({}, "text")}
          placeholder={"Search here"}
        />
        <MaterialCommunityIcons
          style={{ alignSelf: "center" }}
          name="camera-outline"
          size={24}
          color="#888"
        />
        <TouchableOpacity style={styles.searchButton}>
          <LinearGradient
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: padding / 1.4,
              borderRadius: searchHeight,
            }}
            start={{ x: 0.8, y: 0 }}
            end={{ x: 0.0, y: 0 }}
            colors={[tintColorLight, darkYellow]}
          >
            <Text style={{ color: "#fff", padding: padding }}>Search</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          marginRight: padding,
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: tintColorLight }}>GR</Text>
        <TouchableOpacity style={{ marginLeft: padding }}>
          <FontAwesome5
            name="map-marker-alt"
            size={24}
            color={tintColorLight}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    // backgroundColor: tintColorLight,
  },
  searchArea: {
    marginHorizontal: padding,
    // backgroundColor: "transparent",
    textAlignVertical: "center",
    flexDirection: "row",
    borderColor: tintColorLight,
    borderRadius: searchHeight / 2,
    width: width * 0.8,
    borderWidth: 1.5,
    height: searchHeight,
    paddingLeft: padding,
  },
  searchButton: {
    // marginRight: -1,
    marginLeft: padding,
    // backgroundColor: tintColorLight,
    flex: 1,
    borderRadius: searchHeight,
    padding: -1,
  },
  miniAppsSection: {
    marginTop: padding * 2,
  },
});

export default Home;
