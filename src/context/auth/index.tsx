import "react-native-url-polyfill/auto";

import React, { useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";

import useAsyncStorage from "../../hooks/useAsyncStorage";
import Loading from "../../components/Loading";
import supabase from "../../config/supabase";
import User from "../../types/User";

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
  updateUser: <T extends {}>(fields: T) => Promise<void>;
  signOut: () => Promise<any>;
  signInWithFacebook: () => void;
  signInWithEmail: (signInWithEmail: SignInWithEmailProps) => Promise<any>;
  signUpWithEmail: (signInWithEmail: SignUpWithEmailProps) => Promise<any>;
}

const AuthContext = React.createContext<Context>({} as Context);

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { getItem, setItem, removeItem } = useAsyncStorage();

  useEffect(() => {
    getItem("user")
      .then((result) => {
        if (result) {
          setCurrentUser(result);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const saveUser = (user: User) => {
    setItem("user", user)
      .then(() => console.log("saved user localy"))
      .catch((error) => console.log(error));
  };

  // const signInWithGoogle = () => {};
  const signInWithFacebook = async () => {
    const provider = "facebook";
    try {
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      console.log(redirectUri);
      const response = await AuthSession.startAsync({
        authUrl: `https://zriyjjlpytcztjtvbmzr.supabase.co/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUri}`,
        // returnUrl: redirectUri,
      });
      if (!response) return;
      const { user, session, error } = await supabase.auth.signIn({
        refreshToken: response.params?.refresh_token,
      });
      console.log(user);
      if (user) {
        const loggedInUser = {
          email: user?.email,
          id: user?.id,
          photoUrl: user?.user_metadata.avatar_url,
          name: user?.user_metadata.full_name,
        };
        saveUser(loggedInUser);
        setCurrentUser(loggedInUser);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // const signInWithTwitter = () => {};
  // const rememberUser = () => {};

  const updateUser = async <T extends {}>(fields: T) => {
    console.log("runing");

    try {
      await supabase.auth.update({ data: fields });
      const { data } = await supabase
        .from("users")
        .update(fields)
        .match({ id: currentUser?.id })
        .single();

      if (data) {
        saveUser(data);
        setCurrentUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmail = async ({
    email,
    password,
    rememberMe,
  }: SignInWithEmailProps) => {
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });

      if (error) {
        throw error;
      }
      if (user) {
        console.log(user);
        const logedUser = {
          name: user.user_metadata.name,
          id: user.id,
          email: user.email,
          photoUrl: user.user_metadata.photoUrl,
        } as User;
        saveUser(logedUser);
        setCurrentUser(logedUser);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const signUpWithEmail = async ({
    name,
    email,
    password,
  }: SignUpWithEmailProps) => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.log(error);
        throw error;
      }

      if (user) {
        console.log(user);
        const createdUser = {
          id: user.id,
          name: name,
          email: user.email,
        } as User;
        await supabase.auth.update({ data: { name } });
        console.log(createdUser);
        await supabase.from("users").insert(createdUser).single();
        saveUser(createdUser);
        setCurrentUser(createdUser);
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      await removeItem("user");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setCurrentUser(null);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        signOut,
        signInWithEmail,
        signUpWithEmail,
        updateUser,
        signInWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
