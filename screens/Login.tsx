import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

// custom components
import { colors } from "../components/colors";
import { Container } from "../components/shared";
import BigText from "../components/Texts/BigText";
import SmallText from "../components/Texts/SmallText";
import RegularButton from "../components/Buttons/RegularButton";
import LinkText from "../components/Buttons/LinkText";
import TextInput from "../components/Input/TextInput";

const BottomButtonContainer = styled.View`
  width: 100%;
  padding: 40px;
  padding-bottom: 20px;
`;

// background-color: ${colors.white};
const LoginContainer = styled(Container)`
  width: 100%;
  justify-content: center;
`;

const RegisterContainer = styled(Container)`
  max-height: 70px;
`;
// types
import { RootStackParamList } from "../navigation/AppStack";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "Login">;

const Login: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <LoginContainer>
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

      <TextInput iconName='person-outline'>Username</TextInput>
      <TextInput iconName='lock-closed-outline' secureTextEntry={true}>
        Password
      </TextInput>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            navigation.navigate("TabNavigator");
          }}
        >
          Login
        </RegularButton>
      </BottomButtonContainer>
      <RegisterContainer>
        <SmallText textStyles={{ color: colors.secondary }}>
          Don't have an account yet?
        </SmallText>
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
          Register
        </LinkText>
      </RegisterContainer>
    </LoginContainer>
  );
};

export default Login;
