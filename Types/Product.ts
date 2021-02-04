import { NavigationProp, RouteProp } from "@react-navigation/native";
import { HomeStackPramList } from "./Home";

export type Product =  {
  id:number
  title:string
  price:string
  category:string
  description:string
  images:string[]
}

export type ProductNavigationProp <T extends keyof HomeStackPramList> = {
  navigation: NavigationProp<HomeStackPramList, T>;

};
export type ProductRouteProp <T extends keyof HomeStackPramList> = {
  route: RouteProp<HomeStackPramList, T>;

};