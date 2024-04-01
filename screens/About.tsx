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


const AboutContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator">;
//THIS BLURB IS A WORK IN PROGRESS
const title = "All About Us"
const blurb = "Hello! We are the RepXcel team :)\n\nOur names are Qian Chen, Dat Lam, Amanda Nguyen, Justin Ross, Tommy Tran, and Tyler Tran.\n\nWe are a group of engineering students that are passionate about fitness and self-improvement.\n\nThis is a project designed for our capstone course at the University of Calgary.\n\nWe hope that you have a good time using the RepXcel velocity tracking system and that it helps you reach your goals faster!"

const About: FunctionComponent<Props> = (props: Props) => {

  return <AboutContainer>
    <ScrollView>
      <BigText textStyles={{ fontSize: 25, color: colors.secondary, marginTop: 20, marginHorizontal: 15,}}>
          {title}
        </BigText>
      <RegularText textStyles={{ fontSize: 19, color: colors.secondary, marginHorizontal: 15,}}>
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
  </AboutContainer>;
};

export default About;
