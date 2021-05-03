import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../screens/cart/Cart";
import { CartStackPramList } from "../types/Cart";

const CartStack = createStackNavigator<CartStackPramList>();
const CartNavigator = () => (
  <CartStack.Navigator
    screenOptions={{ headerShown: false, headerTitleAlign: "center" }}
  >
    <CartStack.Screen name="Cart" component={Cart} />
  </CartStack.Navigator>
);
export default CartNavigator;
