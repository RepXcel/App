import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// navigation
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppStack";

// custom components
import { colors } from "../components/colors";
import { Container } from "../components/shared";
import RegularButton, {
  BottomButtonContainer,
} from "../components/Buttons/RegularButton";
import RegularText from "../components/Texts/RegularText";

const SettingsContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator">;

const Settings: FunctionComponent<Props> = (props: Props) => {
  return (
    <SettingsContainer>
      <RegularButton
          onPress={() => {
            props.navigation.navigate("Instructions");
          }}
          btnStyles={{
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: colors.primary,
          }}
        >
          Manual
        </RegularButton>
      <RegularButton
          onPress={() => {
            props.navigation.navigate("Login");
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: colors.primary,
          }}
        >
          Recalibrate
        </RegularButton>
      <RegularButton
          onPress={() => {
            props.navigation.navigate("About");
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: colors.primary,
          }}
        >
          About Us
        </RegularButton>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            props.navigation.navigate("Login");
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: colors.darkgray,
          }}
        >
          Logout
        </RegularButton>
      </BottomButtonContainer>
    </SettingsContainer>
  );
};

export default Settings;
