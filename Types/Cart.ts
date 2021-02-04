import { NavigationProp, RouteProp } from "@react-navigation/native";
import navigation from "../navigation";

import { Product } from "./Product";

export type CartStackPramList = {
  Cart:undefined
}

export type CartNavigationProp <T extends keyof CartStackPramList> = {
  navigation: NavigationProp<CartStackPramList, T>;

};

export type CartRouteProp <T extends keyof CartStackPramList> = {
  route : RouteProp<CartStackPramList, T >
};

export type CartItem = {
  product: Product;
  amount: number;
};
