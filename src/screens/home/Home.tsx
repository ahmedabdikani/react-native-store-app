import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import View from "../../components/theme/View";
import useThemeColor from "../../hooks/useThemeColor";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import Advertisment from "../../components/Advertisment";
import ProductList from "../../components/product/ProductList";
import MiniAppList from "../../components/MiniAppList";
import { HomeNavigationProps } from "../../types/Home";
import { Sizes, Styles } from "../../constants/Styles";
import Button from "../../components/button/Button";
import FlatList from "../../components/list/ListFlat";
import Gradient from "../../components/Gradient";
import { useProductContext } from "../../context/ProductContext";
import Body2 from "../../components/typography/Body2";
import H4 from "../../components/typography/H4";

const { width } = Layout.window;
const spacing = Sizes.base;
const searchHeight = 40;

// const fetchProducts = async () => {
//   const { data, status } = await axios.get("https://fakestoreapi.com/products");
//   if (status !== 200) {
//     throw new Error("Error: "status)
//   }
//    return data;
// };

interface IHomeProps extends HomeNavigationProps<"Home"> {}

const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const { products } = useProductContext();
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={[0]}
        contentContainerStyle={{
          paddingLeft: spacing,
          alignItems: "center",
          borderRadius: spacing * 3,
          overflow: "hidden",
        }}
      >
        {() => (
          <View>
            <MiniAppList />
            <Advertisment />
            <View style={{ marginTop: spacing }}>
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
        paddingTop: top + spacing * 3,
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
          <Gradient
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <H4 style={{ color: "#fff" }}>Search</H4>
          </Gradient>
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          ...Styles.centerHV,
        }}
      >
        <Body2
          style={{
            color: tintColorLight,
            paddingRight: spacing / 2,
          }}
        >
          沈阳
        </Body2>
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
    marginHorizontal: spacing,
    textAlignVertical: "center",
    flexDirection: "row",
    borderColor: tintColorLight,
    borderRadius: searchHeight / 2,
    width: width * 0.79,
    borderWidth: 1,
    height: searchHeight,
    marginBottom: spacing / 2,
    paddingLeft: spacing,
  },
  searchButton: {
    overflow: "hidden",
    elevation: 10,
    marginLeft: spacing,
    backgroundColor: tintColorLight,
    borderRadius: searchHeight,
    margin: 2,
  },
});

export default Home;
