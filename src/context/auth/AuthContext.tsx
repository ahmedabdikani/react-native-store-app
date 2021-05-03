import * as React from "react";

import useAsyncStorage from "../../hooks/useAsyncStorage";
import Loading from "../../components/Loading";
import supabase from "../../config/supabase";
import User from "../../types/User";

import "react-native-url-polyfill/auto";

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
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { getItem, setItem, removeItem } = useAsyncStorage();

  React.useEffect(() => {
    getItem("user")
      .then((result) => {
        if (result) {
          setCurrentUser(result);
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

  // const signInWithGoogle = () => {};
  const signInWithFacebook = async () => {
    try {
      console.log("run");
      const {} = await supabase.auth.signIn({ provider: "facebook" });
    } catch (error) {
      console.log(error);
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
