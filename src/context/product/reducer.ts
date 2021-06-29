import supabase from "../../config/supabase";
import { Product } from "../../types/Product";

import "react-native-url-polyfill/auto";

type CreateProduct = {
  type: "CreateProduct";
  payload: Product;
};
type DeleteProduct = {
  type: "DeleteProduct";
  payload: Product["id"];
};

type UpdateProduct = {
  type: "UpdateProduct";
  payload: Product;
};

type Actions = CreateProduct | DeleteProduct| UpdateProduct

const reducer = (state: Product[], action: Actions) => {
  let index;

  const findIndex = (id: Product["id"]) => {
    return state.findIndex((cartItem) => cartItem.product.id === id);
  };

  switch (action.type) {
    case "CreateProduct":
        state = [...state, { product: action.payload, amount: 1, selected:false }];
        state[index] = { ...state[index], amount: state[index].amount + 1 };
    break;
    case "DeleteProduct":
      index = findIndex(action.payload);
      
      break;
      case "UpdateProduct":
        state = state;
      break;
    default:
      state = state;
  }
  
  return [...state];
};

export default reducer