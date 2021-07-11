import { StackScreenProps } from "@react-navigation/stack";

import { Product } from "./Product";


export type CartItem = {
  product: Product;
  selected:boolean,
  amount: number;
};

