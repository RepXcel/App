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

const InstructionsContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator">;
//THIS BLURB IS A WORK IN PROGRESS
const blurb = "These are the instructions:"

const Instructions: FunctionComponent<Props> = (props: Props) => {
  return <InstructionsContainer>
    <ScrollView>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginTop: 20, marginHorizontal: 15,}}>
          {blurb}
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
