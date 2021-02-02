import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { Auth, db } from "../config/firebase";
import { SignUpFormProps } from "../navigation/AuthStack";

import user from "../Types/User";

interface signInWithEmailProps {
  email: string;
  password: string;
  rememberMe?: boolean;
}
interface IAuthContext {
  user: user | null;
  setUser: React.Dispatch<React.SetStateAction<user | null>>;
  signOut: () => void;
  signInWithEmail: (signInWithEmail: signInWithEmailProps) => Promise<void>;
  signUpWithEmail: (signInWithEmail: SignUpFormProps) => Promise<any>;
}

const AuthContext = React.createContext<IAuthContext>(null!);

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};

interface IUserContextProps {}

const fakeuser: user = {
  email: "gsgsd",
  id: "4wesfsfs",
  password: "dfgdsfgsdg",
  name: "fsfsfsfs",
  photo: "https://source.unsplash.com/random/45",
};

export const AuthProvider: React.FC<IUserContextProps> = ({ children }) => {
  const [user, setUser] = React.useState<user | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unsupscribe = Auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);

        if (!user.emailVerified) {
          // user.sendEmailVerification();
        }
        setUser({
          email: user.email!,
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        });
      }
      setLoading(false);
    });

    return () => {
      unsupscribe();
    };
  }, []);

  const getSignedUserFromStorage = () => {
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
  };

  const signInWithEmail = async ({
    email,
    password,
    rememberMe,
  }: signInWithEmailProps) => {
    try {
      const { user } = await Auth.signInWithEmailAndPassword(email, password);
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signInWithGoogle = () => {};
  const signInWithFacebook = () => {};
  const signInWithTwitter = () => {};

  const rememberUser = () => {};
  const signUpWithEmail = async ({ name, email, password }: Partial<user>) => {
    try {
      const { user } = await Auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        await user.updateProfile({ displayName: name });

        // await db.collection("users").doc(user.uid).set({
        //   name,
        //   email,
        //   password,
        //   emailVerified: user.emailVerified,
        //   active: true,
        // });
      }
      return Promise.resolve("sucsess");
    } catch (error) {
      // console.log(error);
      return Promise.reject(error);
    }
  };
  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, signOut, signInWithEmail, signUpWithEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
