import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

//Image Background
import { ImageBackground } from "react-native";
import backgroundImage from "../assets/backgrounds/.jpg";

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

// types
import { RootStackParamList } from "../navigation/AppStack";
import { StackScreenProps } from "@react-navigation/stack";

import { signIn, type SignInInput } from "aws-amplify/auth";
import { useUserContext } from "../src/Contexts";

// background-color: ${colors.white};
const LoginContainer = styled(Container)`
  background-color: ${colors.white};
`;

const ContentContainer = styled(Container)`
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

  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const { setUsername } = useUserContext();

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });

      setUsername(username.toLowerCase());
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  return (
    <LoginContainer>
      {/* <ImageBackground
        source={backgroundImage}
        style={{ width: "100%", height: "100%", justifyContent: "flex-start" }}
        resizeMode='contain'
      > */}
      <ContentContainer>
        <BigText
          textStyles={{
            textAlign: "center",
            color: colors.primary,
            width: "80%",
            marginBottom: 25,
          }}
        >
          Login
        </BigText>

        <TextInput
          iconName='person-outline'
          onTextInput={(text) => { setUsernameInput(text); }}
        >
          Username
        </TextInput>
        <TextInput
          iconName='lock-closed-outline'
          secureTextEntry={true}
          onTextInput={(text) => { setPasswordInput(text) }}
        >
          Password
        </TextInput>
        <BottomButtonContainer>
          <RegularButton
            onPress={() => {
              if (usernameInput.length > 0 && passwordInput.length > 0) {
                handleSignIn({ username: usernameInput, password: passwordInput });
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
              color: colors.primary,
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
      </ContentContainer>
      {/* </ImageBackground> */}
    </LoginContainer>
  );
};

export default Login;
