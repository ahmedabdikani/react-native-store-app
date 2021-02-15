import { Product } from "./types/Product";

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
    uri: string;
  };
};

export type ProfileStackPramList = {
  Profile: undefined;
  Settings: undefined;
  Favorite: Product;
  FollowedStores: undefined;
};
