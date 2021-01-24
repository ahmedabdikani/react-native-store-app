import { NavigationProp, RouteProp } from "@react-navigation/native";
import navigation from "../navigation";
import { BottomTabParamList } from "../types";
import { product } from "./Product";


export type CartNavigationProp <T extends keyof BottomTabParamList> = {
  navigation: NavigationProp<BottomTabParamList, T>;

};

export type CartRouteProp <T extends keyof BottomTabParamList> = {
  route : RouteProp<BottomTabParamList, T >
};

export type cartItem = {
  product: product;
  amount: number;
};
