import * as React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyleSheet } from "react-native";

import Button from "../../components/button/Button";
import { Text, View } from "../../components/theme";
import { Fonts, Sizes, Styles } from "../../constants/Styles";
import useThemeColor from "../../hooks/useThemeColor";
import { AuthNavigationProp, SignUpFormProps } from "../../types/Auth";
import { useAuthContext } from "../../context/AuthContext";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import { tintColorLight } from "../../constants/Colors";
import BackButtonNative from "../../components/button/BackButtonNative";
import Error from "../../components/Error";
import InputForm from "../../components/input/InputForm";
import ButtonSecureText from "../../components/button/ButtonSecureText";
import { Body2, H3 } from "../../components/typography";

const padding = Sizes.base;

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

interface SignUpProps extends AuthNavigationProp<"SignUp"> {}

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
      <Text
        style={{
          alignSelf: "center",
          ...Fonts.h2,
          marginVertical: padding * 2,
        }}
      >
        SIGN UP
      </Text>
      <Form
        control={control}
        onPress={handleSubmit(onSubmit)}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        setSecureTextEntry={setSecureTextEntry}
      />
      <View style={Styles.centerHV}>
        <Error error={signUpError as string | undefined} />
        <Error error={errors.name?.message} />
        <Error error={errors.email?.message} />
        <Error error={errors.password?.message} />
        <Error error={errors.passwordConform?.message} />
      </View>

      <View style={Styles.centerSelf}>
        <View
          style={{
            flexDirection: "row",
            margin: padding,
          }}
        >
          <Body2 secondary>Already have an account?</Body2>

          <Button
            onPress={() => navigation.navigate("SignIn")}
            style={Styles.fRow}
          >
            <H3 primary> Sign In</H3>
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
}
const Form = ({
  control,
  setSecureTextEntry,
  secureTextEntry,
  disabled,
  onPress,
}: FormProps) => {
  const color = useThemeColor({}, "text");
  return (
    <View>
      <InputForm
        name="name"
        placeholder="Enter Name..."
        control={control}
        left={() => <MaterialIcons name="person" color={color} size={20} />}
      />
      <InputForm
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
        keyboardType={"email-address"}
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
        <Text style={styles.loginBtnText}>sign up</Text>
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
    paddingVertical: padding * 1.5,
    borderRadius: padding * 4,
    elevation: 10,
    justifyContent: "center",
    flexDirection: "row",
    marginTop: padding * 2,
    marginBottom: padding * 2,
  },
  loginBtnText: { ...Fonts.h3, color: "#fff", textTransform: "uppercase" },
});

export default SignUp;
