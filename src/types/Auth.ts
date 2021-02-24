import { NavigationProp, RouteProp } from "@react-navigation/core";

export type AuthStackPramList = {
  Intro: undefined
  SignIn: undefined
  SignUp:undefined
}

export type AuthNavigationProp <T extends keyof AuthStackPramList> = {
  navigation: NavigationProp<AuthStackPramList, T>;
};

export type AuthRouteProp <T extends keyof AuthStackPramList> = {
  route : RouteProp<AuthStackPramList, T >
};

export type SignInFormProps = {
  email: string;
  password: string;
}

export interface SignUpFormProps extends SignInFormProps {
  name: string;
  passwordConform: string;
}
