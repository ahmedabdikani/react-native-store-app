
export type SignInFormProps = {
  email: string;
  password: string;
}

export interface SignUpFormProps extends SignInFormProps {
  name: string;
  passwordConform: string;
}
