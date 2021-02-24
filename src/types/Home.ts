import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Product } from "./Product";

export type HomeStackPramList = {
  Home: undefined;
  Product: {
    product: Product;
  };
  ViewContent: {
    uri: string;
  };
};

export type HomeNavigationProps <T extends keyof HomeStackPramList> = {
  navigation: NavigationProp<HomeStackPramList, T>;
  route: RouteProp<HomeStackPramList, T>;

};
