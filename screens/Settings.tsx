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
import { TabParamList } from "../navigation/TabNavigator";

import { useBleContext } from "../src/Contexts";

const SettingsContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator"> &
  StackScreenProps<TabParamList, "Display">;

const Settings: FunctionComponent<Props> = (props: Props) => {
  const { startStreamingData } = useBleContext();
  return (
    <SettingsContainer>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            props.navigation.navigate("Instructions");
          }}
          btnStyles={{
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: colors.tertiary,
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
            backgroundColor: colors.tertiary,
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
            backgroundColor: colors.tertiary,
          }}
        >
          About Us
        </RegularButton>
        <RegularButton
          onPress={() => {
            props.navigation.navigate("Login");
          }}
          btnStyles={{
            marginTop: 60,
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
