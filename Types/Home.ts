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

export type HomeNavigationProp <T extends keyof HomeStackPramList> = {
  navigation: NavigationProp<HomeStackPramList, T>;

};
export type HomeRouteProp <T extends keyof HomeStackPramList> = {
  route: RouteProp<HomeStackPramList, T>;

};
