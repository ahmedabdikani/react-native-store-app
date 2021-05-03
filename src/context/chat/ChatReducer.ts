import { Chat } from "../../types/Chat";

type Create = {
  type: "create";
  payload: Chat;
};
type Update = {
  type: "update";
  payload:Chat ;
};
type Delete = {
  type: "delete";
  payload: Chat["id"];
};

type Actions = Create | Update | Delete;

const reducer = (state: Chat[], action: Actions) => {
  // let index;

  // const findIndex = (id: Chat["id"]) => {
  //   return state.findIndex((chat) => chat.id === id);
  // };

  switch (action.type) {
    case "create":
     return [...state, action.payload]
    break;
    default:
      return state 
  }
  return state;
};

export default reducer