import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// navigation
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppStack";

// custom components
import { useThemeContext } from "../components/colors";
import { Container } from "../components/shared";
import RegularButton, {
  BottomButtonContainer,
} from "../components/Buttons/RegularButton";
import { TabParamList } from "../navigation/TabNavigator";

import { useBleContext } from "../src/Contexts";
import { signOut } from "aws-amplify/auth";

const SettingsContainer = styled(Container)`
  background-color: ${(props) => props.theme.accentBackground};
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator"> &
  StackScreenProps<TabParamList, "Display">;

const Settings: FunctionComponent<Props> = (props: Props) => {
  const { theme, toggleTheme } = useThemeContext();
  const { startStreamingData } = useBleContext();

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <SettingsContainer theme={theme}>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            props.navigation.navigate("Instructions");
          }}
          btnStyles={{
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: theme.tertiary,
          }}
        >
          Manual
        </RegularButton>
        <RegularButton
          onPress={() => {
            startStreamingData();
            props.navigation.navigate("Calibration");
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: theme.tertiary,
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
            backgroundColor: theme.tertiary,
          }}
        >
          About Us
        </RegularButton>
        <RegularButton
          onPress={() => {
            toggleTheme();
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: theme.primary,
          }}
        >
          Change Theme
        </RegularButton>
        <RegularButton
          onPress={async () => {
            await handleSignOut();
            props.navigation.navigate("Login");
          }}
          btnStyles={{
            marginTop: 60,
            marginBottom: 20,
            backgroundColor: theme.buttonGray,
          }}
        >
          Logout
        </RegularButton>
      </BottomButtonContainer>
    </SettingsContainer>
  );
};

export default Settings;
