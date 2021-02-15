import * as React from "react";
import { db } from "../config/firebase";
import User from "../types/User";
import { Chat } from "../types/Chat";

interface Context {
  chats: Chat[];
  searchUser: (name: string) => Promise<any>;
}

const ChatContext = React.createContext<Context>({} as Context);

export const useChatContext = () => {
  return React.useContext(ChatContext);
};

export const ChatProvier: React.FC = ({ children }) => {
  const [chats] = React.useState([]);

  const searchUser = async (name: string) => {
    try {
      const usersRef = db?.collection("users"); //.where("name", "==", name);
      const searchExp = new RegExp(`${name}`, "gi");
      const userDocs = await usersRef?.get();
      const users: User[] = userDocs?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const searchResult = users?.filter((user) =>
        searchExp.test(user.name.trim())
      );

      return searchResult;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <ChatContext.Provider value={{ chats, searchUser }}>
      {children}
    </ChatContext.Provider>
  );
};
