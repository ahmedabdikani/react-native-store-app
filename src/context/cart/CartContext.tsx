import * as React from "react";

import { CartItem } from "../../types/Cart";
import { Product } from "../../types/Product";
import reducer from "./CartReducer";
import useAsyncStorage from "../../hooks/useAsyncStorage";

export type AddProductToCartType = (product: Product) => void;
export type RemoveProductFromCartType = (id: Product["id"]) => void;

interface Context {
  cartItems: CartItem[];
  total: number;
  addProductToCart: AddProductToCartType;
  removeProductFromCart: RemoveProductFromCartType;
  deleteProductFromCart: RemoveProductFromCartType;
  toggleProductSelection: RemoveProductFromCartType;
  selecteAllProducts: () => void;
}

const CartContext = React.createContext<Context>({} as Context);

export const useCartContext = () => {
  return React.useContext(CartContext);
};

export const CartProvider: React.FC = ({ children }) => {
  const [state, useDispatch] = React.useReducer(reducer, []);
  const { getItem, setItem } = useAsyncStorage();
  const total = state.reduce(
    (acc, cartItem) =>
      cartItem.selected
        ? parseInt(cartItem.product.price) * cartItem.amount + acc
        : acc,
    0
  );

  React.useEffect(() => {
    getItem("shoppingCart")
      .then((data) => {
        if (data) {
          useDispatch({ payload: data, type: "UpdateCart" });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const UpdateCartLocaly = () => {
    setItem("shoppingCart", state)
      .then(() => console.log("stored succsesfully"))
      .catch((error) => console.log(error));
  };

  const addProductToCart = (product: Product) => {
    useDispatch({ payload: product, type: "AddProductToCart" });
    UpdateCartLocaly();
  };
  const toggleProductSelection = (id: Product["id"]) => {
    useDispatch({ payload: id, type: "SelectProduct" });
    UpdateCartLocaly();
  };
  const selecteAllProducts = () => {
    useDispatch({ type: "SelectAllProducts" });
    UpdateCartLocaly();
  };
  const removeProductFromCart = (id: Product["id"]) => {
    useDispatch({ payload: id, type: "RemoveProductFromCart" });
    UpdateCartLocaly();
  };
  const deleteProductFromCart = (id: Product["id"]) => {
    useDispatch({ payload: id, type: "DeleteProductFromCart" });
    UpdateCartLocaly();
  };
  return (
    <CartContext.Provider
      value={{
        cartItems: state,
        total,
        deleteProductFromCart,
        removeProductFromCart,
        addProductToCart,
        toggleProductSelection,
        selecteAllProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
