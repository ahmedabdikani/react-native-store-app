import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { useEffect } from "react";
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
  const [user, setUser] = React.useState<User | null>({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unsupscribe = auth!.onAuthStateChanged(async (user) => {
      if (user) {
        if (!user.emailVerified) {
          // user.sendEmailVerification();
        }
        setUser({
          email: user.email!,
          id: user.uid,
          name: user.displayName as string,
          photoUrl: user.photoURL as string,
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
  }: SignInWithEmailProps) => {
    try {
      const { user } = await auth!.signInWithEmailAndPassword(email, password);
      if (user) {
        setUser({
          id: user.uid,
          email: user.email as string,
          name: user.displayName as string,
          photoUrl: user.photoURL as string,
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
        await user.updateProfile({ displayName: name });
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  const signOut = async () => {
    try {
      await auth?.signOut();
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
