import { CartItem } from "../../types/Cart";
import { Product } from "../../types/Product";

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

type UpdateCart = {
  type: "UpdateCart";
  payload: CartItem[];
};

type SelectProduct = {
  type: "SelectProduct";
  payload: Product["id"];
};
type SelectAllProducts = {
  type: "SelectAllProducts";
};
type Actions = AddProductToCart | RemoveProductFromCart | DeleteProductFromCart | SelectProduct | SelectAllProducts | UpdateCart;

const reducer = (state: CartItem[], action: Actions) => {
  let index;

  const findIndex = (id: Product["id"]) => {
    return state.findIndex((cartItem) => cartItem.product.id === id);
  };

  switch (action.type) {
    case "AddProductToCart":
      index = findIndex(action.payload.id);
      if (index < 0) {
        state = [...state, { product: action.payload, amount: 1, selected:false }];
      } else {
        state[index] = { ...state[index], amount: state[index].amount + 1 };
      }
      break;
    case "RemoveProductFromCart":
      index = findIndex(action.payload);
      if (state[index].amount > 1) {
        state[index] = { ...state[index], amount: state[index].amount - 1 };
      }
      break;
    case "DeleteProductFromCart":
      state = state.filter((item) => item.product.id !== action.payload);
      break;
    case "SelectProduct":
      index = index = findIndex(action.payload);
      state[index] = { ...state[index], selected: !state[index].selected }
    break;
    case "SelectAllProducts":
      state =  state.map(cartItem => ({...cartItem,selected:true}))
    break;
    case "UpdateCart":
      state = action.payload;
      break;
    default:
      state = state;
  }
  
  return [...state];
};

export default reducer