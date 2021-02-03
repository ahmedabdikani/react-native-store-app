import { NavigationProp } from "@react-navigation/native";
import Navigation from "./navigation";
import { Product } from "./Types/Product";

export type RootStackParamList = {
  Auth: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  HomeStack: HomeStackPramList;
  Fallowed: undefined;
  ShoppingCart: Product;
  Chat: undefined;
  Profile: undefined;
};

export type HomeStackPramList = {
  Home: undefined;
  Product: {
    product: Product;
  };
  ViewContent: {
    Uri: string;
  };
};

export type ChatStackPramList = {
  Rooms: undefined;
  Chat: undefined;
  AddContact: undefined;
};
export type ProfileStackPramList = {
  Profile: undefined;
  Settings: undefined;
  Favorite: Product;
  FollowedStores: undefined;
};
