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

const InstructionsContainer: React.ComponentType<any> = styled(Container)`
  background-color: ${(props) => props.theme.accentBackground};
  width: 100%;
  flex: 1;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator"> &
  StackScreenProps<TabParamList, "Display">;

//THIS BLURB IS A WORK IN PROGRESS
const blurb = "These are the instructions:";

const Instructions: FunctionComponent<Props> = ({ navigation }) => {
  const { theme } = useThemeContext();
  return (
    <InstructionsContainer theme={theme}>
      <ScrollView>
        <RegularText
          textStyles={{
            fontSize: 19,
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
