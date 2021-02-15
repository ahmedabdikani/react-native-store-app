import * as React from "react";
import { CartItem } from "../types/Cart";
import { Product } from "../types/Product";
import reducer from "./CartReducer";

export type AddProductToCartType = (product: Product) => void;
export type RemoveProductFromCartType = (id: Product["id"]) => void;

interface Context {
  cartItems: CartItem[];
  total: number;
  addProductToCart: AddProductToCartType;
  removeProductFromCart: RemoveProductFromCartType;
  deleteProductFromCart: RemoveProductFromCartType;
}

const CartContext = React.createContext<Context>({} as Context);

export const useCartContext = () => {
  return React.useContext(CartContext);
};

export const CartProvider: React.FC = ({ children }) => {
  const [state, useDispatch] = React.useReducer(reducer, []);

  const total = state.reduce(
    (acc, cartItem) => parseInt(cartItem.product.price) * cartItem.amount + acc,
    0
  );

  const addProductToCart = (product: Product) => {
    useDispatch({ payload: product, type: "AddProductToCart" });
  };
  const removeProductFromCart = (id: Product["id"]) => {
    useDispatch({ payload: id, type: "RemoveProductFromCart" });
  };
  const deleteProductFromCart = (id: Product["id"]) => {
    useDispatch({ payload: id, type: "DeleteProductFromCart" });
  };
  return (
    <CartContext.Provider
      value={{
        cartItems: state,
        total,
        deleteProductFromCart,
        removeProductFromCart,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
