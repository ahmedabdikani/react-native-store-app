import React, { useState, useEffect } from "react";

import supabase from "../../config/supabase";
import { useAuthContext } from "../auth";

import "react-native-url-polyfill/auto";

interface Context {
  favorites: any[];
  createFavorate: (productId: number) => Promise<void>;
}

const FavorateContext = React.createContext<Context>({} as Context);

export const useFavorateContext = () => React.useContext(FavorateContext);

export const FavorateProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState(() => []);
  const { user } = useAuthContext();

  const getFavorites = () => {
    supabase
      .from("favorites")
      .select(
        `products(
          *,
          product_media(
            url
          )
        )
      `
      )
      .match({ user_id: user.id })
      .range(0, 20)
      .then(({ data, error }) => {
        console.log(data);
        if (!error && data) {
          const f = data.map(({ products }) => ({
            ...products,
            images: products["product_media"]?.map((value) => value.url),
          }));

          setFavorites(f);
        }
      });
  };

  useEffect(() => {
    if (user) {
      getFavorites();
    }
    return () => {};
  }, []);

  const createFavorate = async (productId: number) => {
    const { error } = await supabase
      .from("favorites")
      .insert({ product_id: productId, user_id: user.id });

    if (error) {
      console.log(error.message);
    } else {
      getFavorites();
    }
  };

  return (
    <FavorateContext.Provider
      value={{
        favorites,
        createFavorate,
      }}
    >
      {children}
    </FavorateContext.Provider>
  );
};
