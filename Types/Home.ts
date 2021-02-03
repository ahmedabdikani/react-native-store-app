import { Product } from "./Product";

export type HomeStackPramList = {
  Home: undefined;
  Product: {
    product: product;
  };
  ViewContent: {
    imageUri: string;
  };
};