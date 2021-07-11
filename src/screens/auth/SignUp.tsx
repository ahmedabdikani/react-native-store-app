import * as React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyleSheet } from "react-native";

import Button from "../../components/button/Button";
import { View } from "../../components/theme";
import { Sizes, Styles } from "../../constants/Styles";
import useThemeColor from "../../hooks/useThemeColor";
import { SignUpFormProps } from "../../types/Auth";
import { AuthScreenProps } from "../../types/navigation";
import { useAuthContext } from "../../context/auth";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import { tintColorLight } from "../../constants/Colors";
import BackButtonNative from "../../components/button/BackButtonNative";
import InputForm from "../../components/input/InputForm";
import ButtonSecureText from "../../components/button/ButtonSecureText";
import { Body2, ButtonText, H2, Subtitle1 } from "../../components/typography";

const padding = Sizes.spacing.s;

const signUpSchema = yup.object().shape({
  name: yup.string().required("Please Enter Name").trim().min(4),
  email: yup.string().required("Please Enter Email").email().trim(),
  password: yup.string().required("Please Enter Password").trim().min(4),
  passwordConform: yup
    .string()
    .required("Please Enter Conform Password")
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords Must Match"),
});

interface SignUpProps extends AuthScreenProps<"SignUp"> {}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const [disabled, setDisabled] = React.useState(false);
  const [signUpError, setSignUpError] = React.useState<string | null>();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { signUpWithEmail } = useAuthContext();
  const { control, errors, handleSubmit } = useForm<SignUpFormProps>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormProps> = (data) => {
    setDisabled(true);
    signUpWithEmail(data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
        setSignUpError(error.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.BackButtonContainer}>
        <BackButtonNative />
      </View>
      <Logo size={"m"} />
      <H2
        style={{
          alignSelf: "center",
          marginVertical: padding * 2,
        }}
      >
        SIGN UP
      </H2>
      <Form
        errors={errors}
        control={control}
        onPress={handleSubmit(onSubmit)}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        setSecureTextEntry={setSecureTextEntry}
      />
      <View style={Styles.flex} />
      <View style={Styles.centerSelf}>
        <View
          style={{
            flexDirection: "row",
            margin: padding,
            alignItems: "center",
          }}
        >
          <Body2 secondary>Already have an account?</Body2>

          <Button
            onPress={() => navigation.navigate("SignIn")}
            style={Styles.fRow}
          >
            <Subtitle1 primary> Sign In</Subtitle1>
          </Button>
        </View>
      </View>
    </View>
  );
};

interface FormProps {
  control: Control<SignUpFormProps>;
  secureTextEntry: boolean;
  setSecureTextEntry: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
  onPress: () => void;
  errors: Object;
}
const Form = ({
  control,
  setSecureTextEntry,
  secureTextEntry,
  disabled,
  onPress,
  errors,
}: FormProps) => {
  const color = useThemeColor({}, "text");
  return (
    <View>
      <InputForm
        error={errors.name}
        name="name"
        placeholder="Enter Name..."
        control={control}
        left={() => <MaterialIcons name="person" color={color} size={20} />}
      />
      <InputForm
        error={errors.email}
        keyboardType={"email-address"}
        name="email"
        placeholder="Enter Email..."
        control={control}
        left={() => (
          <MaterialCommunityIcons
            name="email-outline"
            color={color}
            size={20}
          />
        )}
      />
      <InputForm
        secureTextEntry={secureTextEntry}
        error={errors.password}
        name="password"
        placeholder="Enter password..."
        control={control}
        left={() => (
          <MaterialCommunityIcons name="lock" color={color} size={20} />
        )}
        right={() => (
          <ButtonSecureText
            secureTextEntry={secureTextEntry}
            setSecureTextEntry={setSecureTextEntry}
          />
        )}
      />
      <InputForm
        secureTextEntry={secureTextEntry}
        error={errors.passwordConform}
        name="passwordConform"
        placeholder="Confirm password..."
        control={control}
        left={() => (
          <MaterialCommunityIcons name="lock" color={color} size={20} />
        )}
        right={() => (
          <ButtonSecureText
            secureTextEntry={secureTextEntry}
            setSecureTextEntry={setSecureTextEntry}
          />
        )}
      />

      <Button onPress={onPress} style={styles.loginBtn}>
        <ButtonText style={styles.loginBtnText}>sign up</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    ...Styles.container,
  },
  BackButtonContainer: {
    position: "absolute",
    top: 50,
    left: padding,
    zIndex: 20,
    padding,
  },
  loginBtn: {
    alignSelf: "center",
    width: 200,
    backgroundColor: tintColorLight,
    alignItems: "center",
    paddingVertical: padding * 0.5,
    borderRadius: padding * 4,
    elevation: 10,
    justifyContent: "center",
    flexDirection: "row",
    marginTop: padding * 2,
    marginBottom: padding * 2,
  },
  loginBtnText: { color: "#fff", paddingVertical: padding },
});

export default SignUp;
