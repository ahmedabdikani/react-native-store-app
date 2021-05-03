import { StackScreenProps } from "@react-navigation/stack";

export type AuthStackPramList = {
  Intro: undefined
  SignIn: undefined
  SignUp:undefined
  BottomTab: undefined
}

export type AuthScreenProps <T extends keyof AuthStackPramList> = StackScreenProps<AuthStackPramList,T>;

export type SignInFormProps = {
  email: string;
  password: string;
}

export interface SignUpFormProps extends SignInFormProps {
  name: string;
  passwordConform: string;
}
