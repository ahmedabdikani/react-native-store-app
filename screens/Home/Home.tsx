import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text, useThemeColor, View } from "../../components/Themed";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import Advertisment from "../../components/Advertisment";
import ProductList from "../../components/product/ProductList";
import { Product } from "../../types/Product";
import MiniAppList from "../../components/MiniAppList";
import { HomeNavigationProp } from "../../types/Home";
import { Fonts, Sizes, Styles } from "../../constants/Styles";
import Button from "../../components/button/Button";
import FlatList from "../../components/list/Flat";
import LinearGradient from "../../components/LinearGradient";
import { useProductContext } from "../../context/ProductContext";

const { width, height } = Layout.window;
const padding = Sizes.base;
const searchHeight = 40;

// const fetchProducts = async () => {
//   const { data, status } = await axios.get("https://fakestoreapi.com/products");
//   if (status !== 200) {
//     throw new Error("Error: "status)
//   }
//    return data;
// };

interface IHomeProps extends HomeNavigationProp<"Home"> {}

const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const { products } = useProductContext();
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={[0]}
        contentContainerStyle={{
          paddingLeft: padding,
          alignItems: "center",
          borderRadius: padding * 3,
          overflow: "hidden",
        }}
      >
        {() => (
          <View>
            <MiniAppList />
            <Advertisment />
            <View style={{ marginTop: padding }}>
              <ProductList products={products} />
            </View>
          </View>
        )}
      </FlatList>
    </View>
  );
};

const Header = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",
        ...Styles.centerH,
        // backgroundColor: "pink",
        paddingTop: top + padding * 3,
      }}
    >
      <View style={styles.searchArea}>
        <TextInput
          style={{ flex: 1, color: useThemeColor({}, "text") }}
          placeholderTextColor={useThemeColor({}, "text")}
          placeholder={"Search here"}
        />
        <Ionicons
          style={{ alignSelf: "center" }}
          name="ios-camera-outline"
          size={24}
          color="#aaa"
        />
        <Button style={styles.searchButton}>
          <LinearGradient>
            <Text
              style={{ ...Fonts.h4, color: "#fff", padding: padding * 1.5 }}
            >
              Search
            </Text>
          </LinearGradient>
        </Button>
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          ...Styles.centerHV,
        }}
      >
        <Text
          style={{
            color: tintColorLight,
            ...Fonts.body2,
            paddingRight: padding / 2,
          }}
        >
          沈阳
        </Text>
        <Button>
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  searchArea: {
    backgroundColor: "transparent",
    marginHorizontal: padding,
    textAlignVertical: "center",
    flexDirection: "row",
    borderColor: tintColorLight,
    borderRadius: searchHeight / 2,
    width: width * 0.79,
    borderWidth: 1,
    height: searchHeight,
    marginBottom: padding / 2,
    paddingLeft: padding,
  },
  searchButton: {
    overflow: "hidden",
    elevation: 10,
    marginLeft: padding,
    backgroundColor: tintColorLight,
    borderRadius: searchHeight,
    margin: 2,
  },
});

export default Home;
