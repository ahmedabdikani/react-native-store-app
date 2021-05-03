import * as React from "react";
import {} from "react-native";
import { Product } from "../../types/Product";

const getImages = (index: number): string[] => {
  return Array.from(
    { length: 5 },
    (_, i) => "https://source.unsplash.com/random/" + (i + 1) * index
  );
};
export const intialData: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: Math.random() * 100000,
  title:
    "officiis magnam consectetur. Quae suscipit sed excepturi ad praesentium odit corrupti voluptates esse quasi consequuntur, minus ipsa.",
  price: (Math.floor(Math.random() * 400) + 103).toString(),

  images: getImages(i + 1),
  category: "",
  description: "",
}));

interface Context {
  products: Product[];
}

const ProductContext = React.createContext<Context>({ products: intialData });

export const useProductContext = () => React.useContext(ProductContext);

export const ProductProvider: React.FC = ({ children }) => {
  const [products] = React.useState<Product[]>(intialData);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
