import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

// custom components
import { colors } from "../components/colors";
import { Container } from "../components/shared";
import BigText from "../components/Texts/BigText";
import SmallText from "../components/Texts/SmallText";
import RegularButton, {
  BottomButtonContainer,
} from "../components/Buttons/RegularButton";
import LinkText from "../components/Buttons/LinkText";
import TextInput from "../components/Input/TextInput";

// background-color: ${colors.white};
const RegisterContainer = styled(Container)`
  width: 100%;
  justify-content: center;
`;

const LoginContainer = styled(Container)`
  max-height: 70px;
`;
// types
import { RootStackParamList } from "../navigation/AppStack";
import { StackScreenProps } from "@react-navigation/stack";

import { signUp } from "aws-amplify/auth";
import localStorage from "../src/backend/localStorage"

type Props = StackScreenProps<RootStackParamList, "Register">;

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

const Register: FunctionComponent<Props> = ({ navigation }) => {

  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState("");

  const { createUser } = localStorage();

  async function handleSignUp({
    username,
    password,
    email,
  }: SignUpParameters) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          // optional
          autoSignIn: false // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });
      console.log(userId);
      createUser(username);
      navigation.navigate("Login");
    } catch (error) {
      console.log('error signing up:', error);
    }
  }


  return (
    <RegisterContainer>
      <BigText
        textStyles={{
          textAlign: "center",
          color: colors.primary,
          width: "80%",
          marginBottom: 25,
        }}
      >
        Register
      </BigText>

      <TextInput
        iconName='person-outline'
        onTextInput={(e) => { setUsernameInput(e) }}
      >
        Username
      </TextInput>
      <TextInput
        iconName='lock-closed-outline'
        secureTextEntry={true}
        onTextInput={(e) => { setPasswordInput(e) }}
      >
        Password
      </TextInput>
      <TextInput
        iconName='lock-closed-outline'
        secureTextEntry={true}
        onTextInput={(e) => { setConfirmPasswordInput(e) }}
      >
        Confirm Password
      </TextInput>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            let email = usernameInput + "@repxcel.com";
            if (passwordInput !== confirmPasswordInput) {
              console.log("Passwords do not match");
              return;
            }
            handleSignUp({ username: usernameInput, password: passwordInput, email });
          }}
        >
          Register
        </RegularButton>
      </BottomButtonContainer>
      <LoginContainer>
        <SmallText>Already have an account?</SmallText>
        <LinkText
          textStyles={{
            color: colors.primary,
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
