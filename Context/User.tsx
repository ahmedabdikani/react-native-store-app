import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { useEffect } from "react";

import user from "../Types/User";

interface IuserContext {
  user: user | null;
  setUser: null | React.Dispatch<React.SetStateAction<user | null>>;
}

const UserContext = React.createContext<IuserContext>({
  user: null,
  setUser: null,
});

export const useUserContext = () => {
  return React.useContext(UserContext);
};

interface IUserContextProps {}

const fakeuser: user = {
  email: "gsgsd",
  id: "4wesfsfs",
  password: "dfgdsfgsdg",
  name: "fsfsfsfs",
  photo: "https://source.unsplash.com/random/45",
};

const UserContextProvider: React.FC<IUserContextProps> = ({ children }) => {
  const [user, setUser] = React.useState<user | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((result) => {
        if (!result) {
          return;
        }
        const currentUser = JSON.parse(result);
        if (currentUser !== null) {
          setUser(currentUser);
        }
      })
      .catch((error) => console.log(error));
    return () => {
      setUser(null);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
