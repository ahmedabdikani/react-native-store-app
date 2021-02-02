import * as React from "react";
import { useState } from "react";
import { Auth, db } from "../config/firebase";

interface ChatContextType {
  searchUser: (userId: string) => Promise<void>;
}
console.ignoredYellowBox = ["Setting a timer"];
export const ChatContext = React.createContext<ChatContextType>(null!);

export const useChatContext = () => {
  return React.useContext(ChatContext);
};

interface IChatProviderProps {}

export const ChatProvier: React.FC<IChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState([]);

  const searchUser = async (username: string) => {
    // try {
    const usersRef = db.collection("users"); //.where("name", "==", username);

    usersRef
      .get()
      .then((doc) => {
        const data = doc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(docs);
    // } catch (error) {
    // console.log(error);
    // }
  };

  return (
    <ChatContext.Provider value={{ searchUser }}>
      {children}
    </ChatContext.Provider>
  );
};
