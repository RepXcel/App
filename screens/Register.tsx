import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

// custom components
import { useThemeContext } from "../components/colors";
import { Container } from "../components/shared";
import BigText from "../components/Texts/BigText";
import SmallText from "../components/Texts/SmallText";
import RegularButton, {
  BottomButtonContainer,
} from "../components/Buttons/RegularButton";
import LinkText from "../components/Buttons/LinkText";
import TextInput from "../components/Input/TextInput";

// background-color: ${(props) => props.theme.white};
const RegisterContainer = styled(Container)`
  width: 100%;
  justify-content: center;
`;

const LoginContainer = styled(Container)`
  max-height: 70px;
  background-color: transparent;
`;
// types
import { RootStackParamList } from "../navigation/AppStack";
import { StackScreenProps } from "@react-navigation/stack";

import { signUp } from "aws-amplify/auth";
import localStorage from "../src/backend/localStorage";
import { Alert } from "react-native";
import { WaveAnimation } from "../components/Loading/WaveBackground";

type Props = StackScreenProps<RootStackParamList, "Register">;

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

const Register: FunctionComponent<Props> = ({ navigation }) => {
  const { theme } = useThemeContext();
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState("");

  const { createUser } = localStorage();

  async function handleSignUp({ username, password, email }: SignUpParameters) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          // optional
          autoSignIn: false, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });
      console.log(userId);
      createUser(username.toLowerCase());
      navigation.navigate("Login");
    } catch (error) {
      console.log("error signing up:", error);
      if (error instanceof Error) {
        Alert.alert("Uh oh!", error.message);
      } else {
        Alert.alert("An unknown error occurred");
      }
    }
  }

  return (
    <RegisterContainer>
      <WaveAnimation />
      <BigText
        textStyles={{
          textAlign: "center",
          width: "80%",
          marginBottom: 25,
          color: theme.waveTitle,
        }}
      >
        Register
      </BigText>

      <TextInput
        iconName='person-outline'
        onTextInput={(e) => {
          setUsernameInput(e);
        }}
      >
        Username
      </TextInput>
      <TextInput
        iconName='lock-closed-outline'
        secureTextEntry={true}
        onTextInput={(e) => {
          setPasswordInput(e);
        }}
      >
        Password
      </TextInput>
      <TextInput
        iconName='lock-closed-outline'
        secureTextEntry={true}
        onTextInput={(e) => {
          setConfirmPasswordInput(e);
        }}
      >
        Confirm Password
      </TextInput>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            let email = usernameInput + "@repxcel.com";
            if (passwordInput !== confirmPasswordInput) {
              console.log("Passwords do not match");
              Alert.alert("Uh oh!", "Passwords do not match");
              return;
            }
            handleSignUp({
              username: usernameInput,
              password: passwordInput,
              email,
            });
          }}
        >
          Register
        </RegularButton>
      </BottomButtonContainer>
      <LoginContainer>
        <SmallText>Already have an account?</SmallText>
        <LinkText
          textStyles={{
            color: theme.wavePrimary,
            textDecorationLine: "underline",
            fontSize: 15,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Sign In
        </LinkText>
      </LoginContainer>
    </RegisterContainer>
  );
};

export default Register;
