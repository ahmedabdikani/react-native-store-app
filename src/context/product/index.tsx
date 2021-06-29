import React, { useState, useEffect } from "react";
// import { v4 } from "uuid";

import { Product } from "../../types/Product";
import supabase from "../../config/supabase";
import { useAuthContext } from "../auth/AuthContext";
import localFileToBlob from "../../utils/localFileToBlob";
import storage from "../../config/storage";

import "react-native-url-polyfill/auto";

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
  createProduct: (product: Product) => Promise<void>;
  getData: () => void;
}

const ProductContext = React.createContext<Context>({} as Context);

export const useProductContext = () => React.useContext(ProductContext);

export const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState(() => []);
  const { user } = useAuthContext();

  const getData = () => {
    supabase
      .from("products")
      .select(
        `
        *,
        product_media(
          url
        )as images
      `
      )
      .range(products.length, products.length + 30)
      .then(({ data, error }) => {
        console.log(data);
        if (!error) {
          setProducts(
            data.map((row) => ({
              ...row,
              images: row["product_media"]?.map((value) => value.url),
            }))
          );
        }
      });
  };

  useEffect(() => {
    if (user) {
      getData();
    }
    return () => {};
  }, []);

  const createProduct = async ({
    description,
    images,
    title,
    price,
    comparePrice,
  }: Product) => {
    const imageUrlPromise = images.map((image) => uploadImage(image));
    const imgUrls = await Promise.all(imageUrlPromise);

    const { data } = await supabase
      .from("products")
      .insert({ description, title, price, comparePrice, userId: user?.id });
    if (data) {
      console.log(data);
      const { error } = await supabase.from("product_media").insert(
        imgUrls.map((url) => ({
          product_id: data[0].id,
          url,
        }))
      );
      if (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        createProduct,
        getData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const uploadImage = async (image: any) => {
  try {
    const blob = await localFileToBlob(image.uri);
    const profileRef = storage?.ref("/product");
    const extension = blob.type.split("/")[1];
    const imageRef = profileRef?.child(
      `${Math.random() * 100000}${Date.now()}.${extension}`
    );
    return imageRef?.put(blob).then(async (snapshot) => {
      console.log("Uploaded");
      return imageRef.getDownloadURL();
    });
  } catch (error) {
    throw error;
  }
};
