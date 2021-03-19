import { NavigationProp, RouteProp } from "@react-navigation/core";
import { Product } from "./Product";

export type ProfileStackPramList = {
  Me: undefined;
  Settings: undefined;
  Profile:undefined;
  Favorite: Product;
  FollowedStores: undefined;
};

export type ProfileScreenProps <T extends keyof ProfileStackPramList> = {
  navigation: NavigationProp<ProfileStackPramList, T>;
  route: RouteProp<ProfileStackPramList, T>;

};