import { NavigationProp, RouteProp } from "@react-navigation/core";
import User from "./User";

export type ChatStackPramList = {
  Rooms: undefined;
  Chat: {item:User};
  Contacts: undefined;
  Camera:undefined
};

type Text = {
  type: "text";
  message:string;
}
type Audio = {
  type: "audio";
  message:string;
}
type Video = {
  type: "video";
  message:string;
}

export type Chat = {
  id:number| string;
  sender:Partial<User>;
  reciever:Partial<User>;
  message:Text | Audio|Video
}

export type ChatScreenProps <T extends keyof ChatStackPramList> = {
  navigation: NavigationProp<ChatStackPramList, T>;
  route : RouteProp<ChatStackPramList, T >
};
