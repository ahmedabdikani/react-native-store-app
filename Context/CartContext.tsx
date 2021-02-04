import * as React from "react";
import { CartItem } from "../Types/Cart";
import { Product } from "../Types/Product";

export type AddProductFromCartType = (product: Product) => void;
export type RemoveProductFromCartType = (id: Product["id"]) => void;

interface CartContext {
  cartItems: CartItem[];
  total: number;
  addProductToCart: AddProductFromCartType;
  removeProductFromCart: RemoveProductFromCartType;
  deleteProductFromCart: RemoveProductFromCartType;
}

type AddProductToCart = {
  type: "AddProductToCart";
  payload: Product;
};
type RemoveProductFromCart = {
  type: "RemoveProductFromCart";
  payload: Product["id"];
};
type DeleteProductFromCart = {
  type: "DeleteProductFromCart";
  payload: Product["id"];
};

type Actions = AddProductToCart | RemoveProductFromCart | DeleteProductFromCart;

const reducer = (state: CartItem[], action: Actions) => {
  let index;

  const findIndex = (id: Product["id"]) => {
    return state.findIndex((cartItem) => cartItem.product.id === id);
  };

  switch (action.type) {
    case "AddProductToCart":
      index = findIndex(action.payload.id);
      if (index < 0) {
        state = [...state, { product: action.payload, amount: 1 }];
      } else {
        state[index] = { ...state[index], amount: state[index].amount + 1 };
      }
      break;
    case "RemoveProductFromCart":
      index = findIndex(action.payload as Product["id"]);
      if (state[index].amount > 1) {
        state[index] = { ...state[index], amount: state[index].amount - 1 };
      }
      break;
    case "DeleteProductFromCart":
      state = state.filter((item) => item.product.id !== action.payload);
      break;
    default:
      state = state;
  }
  return state;
};

const CartContext = React.createContext<CartContext>({} as CartContext);

export const useCartContext = () => {
  return React.useContext(CartContext);
};

interface ICartProviderProps {}

export const CartProvider: React.FC<ICartProviderProps> = ({ children }) => {
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
