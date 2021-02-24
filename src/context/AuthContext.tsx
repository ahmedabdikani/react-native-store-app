import * as React from "react";

import useAsyncStorage from "../hooks/useAsyncStorage";
import Loading from "../components/Loading";
import { auth, db } from "../config/firebase";

import User from "../types/User";

interface SignInWithEmailProps {
  email: string;
  password: string;
  rememberMe?: boolean;
}
interface SignUpWithEmailProps {
  name: string;
  email: string;
  password: string;
}
interface Context {
  user: User | null;
  signOut: () => Promise<any>;
  signInWithEmail: (signInWithEmail: SignInWithEmailProps) => Promise<any>;
  signUpWithEmail: (signInWithEmail: SignUpWithEmailProps) => Promise<any>;
}

const AuthContext = React.createContext<Context>({} as Context);

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};

const fakeuser: User = {
  email: "ahmedabdikani@g.com",
  id: "random",
  name: "ahmed abdikani",
  photoUrl: "https://source.unsplash.com/random/45",
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { getItem, setItem, removeItem } = useAsyncStorage();

  React.useEffect(() => {
    getItem("user")
      .then((result) => {
        if (result) {
          setUser(result);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const saveUser = (user: User) => {
    setItem("user", user)
      .then(() => console.log("saved user localy"))
      .catch((error) => console.log(error));
  };

  const signInWithGoogle = () => {};
  const signInWithFacebook = () => {};
  const signInWithTwitter = () => {};
  const rememberUser = () => {};
  const signInWithEmail = async ({
    email,
    password,
    rememberMe,
  }: SignInWithEmailProps) => {
    try {
      const { user } = await auth!.signInWithEmailAndPassword(email, password);
      if (user) {
        const logedUser = {
          name: user.displayName,
          id: user.uid,
          email: user.email,
          photoUrl: user.photoURL,
        } as User;
        saveUser(logedUser);
        setUser(logedUser);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signUpWithEmail = async ({
    name,
    email,
    password,
  }: SignUpWithEmailProps) => {
    try {
      const { user } = await auth!.createUserWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        const createdUser = {
          id: user.uid,
          name,
          email: user.email,
          photoUrl: user.photoURL,
        } as User;
        await user.updateProfile({ displayName: name });
        await db?.collection("users").doc(user.uid).set(createdUser);
        saveUser(createdUser);
        setUser(createdUser);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  const signOut = async () => {
    try {
      await auth?.signOut();
      await removeItem("user");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ user, signOut, signInWithEmail, signUpWithEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
