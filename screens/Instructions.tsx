import React, { FunctionComponent } from "react";
import { ScrollView } from "react-native";
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
import RegularText from "../components/Texts/RegularText";
import { TabParamList } from "../navigation/TabNavigator";
import BigText from "../components/Texts/BigText";

const InstructionsContainer: React.ComponentType<any> = styled(Container)`
  background-color: ${(props) => props.theme.accentBackground};
  width: 100%;
  flex: 1;
`;

const InstructionSection: FunctionComponent<{
  title: string;
  instructions: string[];
}> = ({ title, instructions }) => (
  <>
    <BigText
      textStyles={{
        fontSize: 22,
        marginHorizontal: 15,
        marginTop: 20,
      }}
    >
      {title}
    </BigText>
    {instructions.map((instruction, index) => (
      <RegularText
        key={index}
        textStyles={{
          fontSize: 16,
          marginBottom: 5,
          marginHorizontal: 15,
        }}
      >
        {instruction}
      </RegularText>
    ))}
  </>
);

type Props = StackScreenProps<RootStackParamList, "TabNavigator"> &
  StackScreenProps<TabParamList, "Display">;

//THIS BLURB IS A WORK IN PROGRESS
const blurb = "These are the instructions:";

const Instructions: FunctionComponent<Props> = ({ navigation }) => {
  const { theme } = useThemeContext();

  const sections = [
    {
      title: "Calibration",
      instructions: [
        "1. Attach the RepXcel velocity tracking peripheral to your barbell. Ensure that it is securely attached.",
        "2. Navigate to the Calibration screen by going to Settings -> Calibration.",
        "3. Once you have arrived at the Calibration screen, you may begin performing a regular set until failure.",
        "4. After the set is complete, press the “Finish Calibration” button at the bottom of your screen.",
        "5. Your calibration set should be complete and will be utilized to calculate your RPE for your subsequent workout sessions!",
        "6. Calibrate regularly and when switching exercises to get the best results out of your RepXcel device.",
      ],
    },
    {
      title: "Starting a Session",
      instructions: [
        "1. Attach the RepXcel velocity tracking peripheral to your barbell. Ensure that it is securely attached.",
        "2. Navigate to the home screen of the application by pressing on the home icon on the navigation bar.",
        "3. Press the “Start Session” button.",
        "4. You may now begin performing your set.",
        "5. After the set is complete, press the “End Session” button.",
        "6. You have now completed your set and your RPE and set data should now be available to you.",
      ],
    },
    {
      title: "Note",
      instructions: [
        "Currently, the RepXcel system is only designed for the big three exercises: bench press, squat, and deadlift.",
      ],
    },
  ];

  return (
    <InstructionsContainer theme={theme}>
      <ScrollView>
        <BigText
          textStyles={{
            fontSize: 25,
            marginTop: 20,
            marginHorizontal: 15,
          }}
        >
          {"How To:"}
        </BigText>
        {sections.map((section, index) => (
          <InstructionSection
            key={index}
            title={section.title}
            instructions={section.instructions}
          />
        ))}
      </ScrollView>
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {
            navigation.navigate("Settings");
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: theme.buttonGray,
          }}
        >
          Back
        </RegularButton>
      </BottomButtonContainer>
    </InstructionsContainer>
  );
};

export default Instructions;
