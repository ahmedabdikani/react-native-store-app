import { NavigationProp, RouteProp } from "@react-navigation/core";

export type ChatStackPramList = {
  Rooms: undefined;
  Chat: undefined;
  Contacts: undefined;
};

export type Chat = unknown

export type ChatNavigationProp <T extends keyof ChatStackPramList> = {
  navigation: NavigationProp<ChatStackPramList, T>;

};

export type ChatRouteProp <T extends keyof ChatStackPramList> = {
  route : RouteProp<ChatStackPramList, T >
};