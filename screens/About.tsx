import React, { FunctionComponent } from "react";
import { ScrollView } from "react-native";
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
import DeviceCard from "../components/Cards/DataCards/BluetoothDeviceCard";
import VerticalCardList from "../components/Cards/VerticalCardList";
import RegularText from "../components/Texts/RegularText";
import { TabParamList } from "../navigation/TabNavigator";

const AboutContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator"> &
  StackScreenProps<TabParamList, "Display">;

//THIS BLURB IS A WORK IN PROGRESS
const blurb = "Hello we are the RepXcel team. It's nice to meet you :)";

const About: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <AboutContainer>
      <ScrollView>
        <RegularText
          textStyles={{
            fontSize: 19,
            color: colors.secondary,
            marginTop: 20,
            marginHorizontal: 15,
          }}
        >
          {blurb}
        </RegularText>
      </ScrollView>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            navigation.navigate("Settings");
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: colors.darkgray,
          }}
        >
          Back
        </RegularButton>
      </BottomButtonContainer>
    </AboutContainer>
  );
};

export default About;
