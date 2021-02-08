import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";

import { Text, useThemeColor, View } from "../../components/Themed";
import { darkYellow, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import Advertisment from "../../components/Advertisment";
import ProductList from "../../components/ProductList";
import { Product as product } from "../../types/Product";
import MiniAppList from "../../components/MiniAppList";
import { HomeNavigationProp } from "../../types/Home";
import { Sizes } from "../../constants/Styles";
import Button from "../../components/Button";

const { width, height } = Layout.window;
const padding = Sizes.base;
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

// const fetchProducts = async () => {
//   const { data, status } = await axios.get("https://fakestoreapi.com/products");
//   if (status === 200) {
//     return Promise.resolve(data);
//   }
// };

interface IHomeProps extends HomeNavigationProp<"Home"> {}

const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const { top } = useSafeAreaInsets();

  React.useEffect(() => {});

  return (
    <View style={{ ...styles.container, paddingTop: top + padding }}>
      <Header />
      <FlatList
        data={[0]}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          padding,
          marginTop: padding * 3,
          borderRadius: padding * 3,
          overflow: "hidden",
          backgroundColor: useThemeColor({}, "background"),
        }}
        renderItem={() => {
          return (
            <View>
              <MiniAppList />
              <Advertisment />
              <View style={{ marginTop: padding }}>
                <ProductList products={products} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const Header = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <Button style={styles.searchButton}>
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
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: tintColorLight }}>GR</Text>
        <Button style={{ marginLeft: padding }}>
          <FontAwesome5
            name="map-marker-alt"
            size={24}
            color={tintColorLight}
          />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchArea: {
    marginHorizontal: padding,
    textAlignVertical: "center",
    flexDirection: "row",
    borderColor: tintColorLight,
    borderRadius: searchHeight / 2,
    width: width * 0.8,
    borderWidth: 1.5,
    height: searchHeight,
    marginBottom: padding,
    paddingLeft: padding,
  },
  searchButton: {
    elevation: 10,
    marginRight: -1,
    marginLeft: padding,
    backgroundColor: tintColorLight,
    borderRadius: searchHeight,
    padding: -1,
  },
  miniAppsSection: {
    marginTop: padding * 2,
  },
});

export default Home;
