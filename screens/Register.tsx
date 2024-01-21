import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { colors } from "../components/colors";
import { Container, BottomButtonContainer } from "../components/shared";
import RegularButton from "../components/Buttons/RegularButton";

// navigate to Display
import TabNavigator from "../navigation/TabNavigator";

const RegisterContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
  justify-content: flex-end;
`;

// types
import { RootStackParamList } from "../navigation/AppStack";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "Register">;

const Register: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <RegisterContainer>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            navigation.navigate("TabNavigator");
          }}
        >
          Register
        </RegularButton>
      </BottomButtonContainer>
    </RegisterContainer>
  );
};

export default Register;
