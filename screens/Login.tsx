import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { colors } from "../components/colors";
import { Container, BottomButtonContainer } from "../components/shared";
import RegularButton from "../components/Buttons/RegularButton";
import BigText from "../components/Texts/BigText";

// navigate to Display
import TabNavigator from "../navigation/TabNavigator";

const LoginContainer = styled(Container)`
  background-color: ${colors.white};
  color: ${colors.darkgray};
  width: 100%;
  flex: 1;
  justify-content: flex-end;
`;

// types
import { RootStackParamList } from "../navigation/AppStack";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "Login">;

const Login: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <LoginContainer>
      <BigText textStyles={{ color: colors.secondary }}>Login</BigText>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            navigation.navigate("TabNavigator");
          }}
        >
          Login
        </RegularButton>
      </BottomButtonContainer>
    </LoginContainer>
  );
};

export default Login;
