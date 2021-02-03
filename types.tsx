import { NavigationProp } from "@react-navigation/native";
import Navigation from "./navigation";
import { product } from "./Types/Product";

export type RootStackParamList = {
  Auth: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  HomeStack: HomeStackPramList;
  Fallowed: undefined;
  ShoppingCart: product;
  Chat: undefined;
  Me: undefined;
  TabOne: undefined;
};

export type HomeStackPramList = {
  Home: undefined;
  Product: {
    product?: product;
  };
  ViewContent: {
    imageUri: string;
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
  Favorite: product;
  FollowedStores: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
