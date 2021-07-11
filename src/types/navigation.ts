import { BottomTabNavigationProp, } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp,  } from "@react-navigation/native";
import {StackNavigationProp,StackScreenProps } from "@react-navigation/stack";
import { NavigationProp, NavigatorScreenParams, } from '@react-navigation/native';

import { Product } from "./Product";

// Param Lists

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackPramList>;
  NotFound: undefined;
};

export type AuthStackPramList = {
  Intro: undefined
  SignIn: undefined
  SignUp:undefined
  BottomTab: NavigatorScreenParams<BottomTabParamList>
}
export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackPramList>;
  Playground: undefined;
  CartStack: NavigatorScreenParams<CartStackPramList>;
  ChatStack: NavigatorScreenParams<ChatStackPramList>;
  ProfileStack: NavigatorScreenParams<ProfileStackPramList>;
};
export type HomeStackPramList = {
  Home: undefined;
  Product:{product:Product}
  Comments:undefined;
};
export type ProfileStackPramList = {
  Me: undefined;
  Settings: undefined;
  Profile:undefined;
  Favorite: Product;
  Store:undefined
  AddProduct:undefined;
  FollowedStores: undefined;
}
export type CartStackPramList = {
  Cart:undefined
}
export type ChatStackPramList = {
  Rooms: undefined;
  Chat: undefined;
  Contacts: undefined;
  Camera:undefined
};


// Screen Props

export type AuthScreenProps <T extends keyof AuthStackPramList> = StackScreenProps<AuthStackPramList,T>;
export type BottomTabScreenProps<T extends keyof BottomTabParamList> = {
  navigation: NavigationProp<BottomTabParamList,T>,
  route:RouteProp<BottomTabParamList,T>
}
export type HomeScreenProps <T extends keyof HomeStackPramList> = {
  navigation: CompositeNavigationProp<
  StackNavigationProp<HomeStackPramList, T>,
  BottomTabNavigationProp<BottomTabParamList>
  >
  route:RouteProp<HomeStackPramList,T>
}
export type CartScreenProps <T extends keyof CartStackPramList> = StackScreenProps<CartStackPramList,T>
export type ProfileScreenProps <T extends keyof ProfileStackPramList> = StackScreenProps<ProfileStackPramList,T>
export type ChatScreenProps <T extends keyof ChatStackPramList> = StackScreenProps<ChatStackPramList,T>
