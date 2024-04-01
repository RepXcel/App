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
import RegularText from "../components/Texts/RegularText";
import BigText from "../components/Texts/BigText";

const InstructionsContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator">;
//THIS BLURB IS A WORK IN PROGRESS
const title = "How To:"
const heading1 = "Calibration"
const heading2 = "Starting a Session"
const heading3 = "Note"
const blurb1_1 = "1. Attach the RepXcel velocity tracking peripheral to your barbell. Ensure that it is securely attached."
const blurb1_2 = "2. Navigate to the Calibration screen by going to Settings -> Calibration."
const blurb1_3 = "3. Once you have arrived at the Calibration screen, you may begin performing a regular set until failure."
const blurb1_4 = "4. After the set is complete, press the “Finish Calibration” button at the bottom of your screen."
const blurb1_5 = "5. Your calibration set should be complete and will be utilized to calculate your RPE for your subsequent workout sessions!"
const blurb1_6 = "6. Calibrate regularly and when switching exercises to get the best results out of your RepXcel device."
const blurb2_1 = "1. Attach the RepXcel velocity tracking peripheral to your barbell. Ensure that it is securely attached."
const blurb2_2 = "2. Navigate to the home screen of the application by pressing on the home icon on the navigation bar."
const blurb2_3 = "3. Press the “Start Session” button."
const blurb2_4 = "4. You may now begin performing your set."
const blurb2_5 = "5. After the set is complete, press the “End Session” button."
const blurb2_6 = "6. You have now completed your set and your RPE and set data should now be available to you."
const blurb3 = "Currently, the RepXcel system is only designed for the big three exercises: bench press, squat, and deadlift."

const Instructions: FunctionComponent<Props> = (props: Props) => {
  return <InstructionsContainer>
    <ScrollView>
      <BigText textStyles={{ fontSize: 25, color: colors.secondary, marginTop: 20, marginHorizontal: 15,}}>
          {title}
        </BigText>
      <BigText textStyles={{ fontSize: 22, color: colors.secondary, marginHorizontal: 15,}}>
          {heading1}
        </BigText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb1_1}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5,marginHorizontal: 15,}}>
          {blurb1_2}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb1_3}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb1_4}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb1_5}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb1_6}
        </RegularText>
      <BigText textStyles={{ fontSize: 22, color: colors.secondary, marginHorizontal: 15,}}>
          {heading2}
        </BigText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb2_1}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5,marginHorizontal: 15,}}>
          {blurb2_2}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb2_3}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb2_4}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb2_5}
        </RegularText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb2_6}
        </RegularText>
      <BigText textStyles={{ fontSize: 22, color: colors.secondary, marginHorizontal: 15,}}>
          {heading3}
        </BigText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginBottom:5, marginHorizontal: 15,}}>
          {blurb3}
        </RegularText>
      </ScrollView>
    <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: colors.darkgray,
          }}
        >
          Back
        </RegularButton>
      </BottomButtonContainer>
  </InstructionsContainer>;
};

export default Instructions;
