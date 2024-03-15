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

type Props = StackScreenProps<RootStackParamList, "Register">;

const Register: FunctionComponent<Props> = ({ navigation }) => {
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

      <TextInput iconName='person-outline'>Username</TextInput>
      <TextInput iconName='lock-closed-outline' secureTextEntry={true}>
        Password
      </TextInput>
      <TextInput iconName='lock-closed-outline' secureTextEntry={true}>
        Confirm Password
      </TextInput>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            navigation.navigate("TabNavigator");
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
