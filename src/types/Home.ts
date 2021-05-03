import React from "react"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import {StackScreenProps } from "@react-navigation/stack";
import { Product } from "./Product";

export type HomeStackPramList = {
  Home: undefined;
  Product: {
    product: Product;
  };
};

export type HomeNavigationProps <T extends keyof HomeStackPramList> = {
 route:StackScreenProps<HomeStackPramList, T>["route"],
 navigation: CompositeNavigationProp<
 StackScreenProps<HomeStackPramList, T>["navigation"],
 BottomTabNavigationProp<HomeStackPramList>
 >
}
 