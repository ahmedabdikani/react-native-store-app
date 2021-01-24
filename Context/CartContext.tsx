import * as React from "react";
import { product } from "../Types/Product";
import { cartItem } from "../Types/ShoppingCart";

interface CartContextType {
  cartItems: cartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<cartItem[]>>;
}

const CartContext = React.createContext<CartContextType>(null);

export const useCartContext = () => {
  return React.useContext(CartContext);
};

interface ICartContextProviderProps {}

const CartContextProvider: React.FC<ICartContextProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = React.useState<cartItem[]>([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
