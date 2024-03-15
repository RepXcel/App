import React, { FunctionComponent } from "react";
import { ScrollView, Image, Dimensions } from "react-native";
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

const InstructionsContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator"> &
  StackScreenProps<TabParamList, "Display">;

//THIS BLURB IS A WORK IN PROGRESS
const blurb = "CALIBRATION TIME WOOO";

const Calibration: FunctionComponent<Props> = ({ navigation }) => {
  const { width } = Dimensions.get("window");

  return (
    <InstructionsContainer>
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
        <Image
          source={require("../assets/loading.gif")}
          style={{ width: width - 90, height: width - 90 }}
        />
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
    </InstructionsContainer>
  );
};

export default Calibration;
