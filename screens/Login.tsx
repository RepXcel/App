import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

//Image Background
import { Alert, ImageBackground } from "react-native";
import backgroundImage from "../assets/backgrounds/.jpg";

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

// types
import { RootStackParamList } from "../navigation/AppStack";
import { StackScreenProps } from "@react-navigation/stack";

import { signIn, type SignInInput } from "aws-amplify/auth";
import { useUserContext } from "../src/Contexts";
import { WaveAnimation } from "../components/Loading/WaveBackground";

// background-color: ${(props) => props.theme.white};
const LoginContainer = styled(Container)`
  background-color: transparent;
  width: 100%;
  justify-content: center;
`;

const RegisterContainer = styled(Container)`
  background-color: transparent;
  max-height: 70px;
`;

type Props = StackScreenProps<RootStackParamList, "Login">;

const Login: FunctionComponent<Props> = ({ navigation }) => {
  const { theme } = useThemeContext();

  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const { setUsername } = useUserContext();

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });

      setUsername(username.toLowerCase());
      navigation.navigate("TabNavigator");
    } catch (error: unknown) {
      console.log("error signing in", error);

      if (error instanceof Error) {
        Alert.alert("Uh oh!", error.message);
      } else {
        Alert.alert("An unknown error occurred");
      }
    }
  }

  return (
    <LoginContainer>
      <WaveAnimation />
      <BigText
        textStyles={{
          textAlign: "center",
          width: "80%",
          marginBottom: 25,
          color: theme.waveTitle,
        }}
      >
        Login
      </BigText>

      <TextInput
        iconName='person-outline'
        onTextInput={(text) => {
          setUsernameInput(text);
        }}
      >
        Username
      </TextInput>
      <TextInput
        iconName='lock-closed-outline'
        secureTextEntry={true}
        onTextInput={(text) => {
          setPasswordInput(text);
        }}
      >
        Password
      </TextInput>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            if (usernameInput.length > 0 && passwordInput.length > 0) {
              handleSignIn({
                username: usernameInput,
                password: passwordInput,
              });
            }
          }}
        >
          Login
        </RegularButton>
      </BottomButtonContainer>
      <RegisterContainer>
        <SmallText>Don't have an account yet?</SmallText>
        <LinkText
          textStyles={{
            color: theme.wavePrimary,
            textDecorationLine: "underline",
            fontSize: 15,
          }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Sign Up
        </LinkText>
      </RegisterContainer>
    </LoginContainer>
  );
};

export default Login;
