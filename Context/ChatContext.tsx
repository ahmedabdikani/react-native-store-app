import * as React from "react";
import { useState } from "react";
import { auth, db } from "../config/firebase";

interface ChatContextType {
  searchUser: (name: string) => Promise<any>;
}
console.ignoredYellowBox = ["Setting a timer"];
export const ChatContext = React.createContext<ChatContextType>(null!);

export const useChatContext = () => {
  return React.useContext(ChatContext);
};

interface IChatProviderProps {}

export const ChatProvier: React.FC<IChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState([]);

  const searchUser = async (name: string) => {
    try {
      const usersRef = db.collection("users"); //.where("name", "==", name);
      const searchExp = new RegExp(`${name}`, "gi");
      const userDocs = await usersRef.get();
      const users = userDocs?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const searchResult = users?.filter((user) =>
        searchExp.test(user.name.trim())
      );

      return Promise.resolve(searchResult);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  return (
    <ChatContext.Provider value={{ searchUser }}>
      {children}
    </ChatContext.Provider>
  );
};
