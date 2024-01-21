import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

//custom components
import { colors } from "../components/colors";
import { Container } from "../components/shared";
import BigText from "../components/Texts/BigText";
import RegularText from "../components/Texts/RegularText";
import SmallText from "../components/Texts/SmallText";
import RegularButton from "../components/Buttons/RegularButton";
import TabNavigator from "../navigation/TabNavigator";

const RegisterContainer = styled(Container)`
  background-color: ${colors.secondary};
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const TopSection = styled.View`
  width: 100%;
  flex: 1;
  max-height: 55%;
`;
const BottomSection = styled.View`
  width: 100%;
  max-height: 40%;
  top: -25%;
  padding: 50px;
  flex: 1;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
`;

const TopImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: stretch;
`;

//image
import backgroundWaves from "../assets/backgrounds/backgroundWaves.png";

// types
import { RootStackParamList } from "../navigation/AppStack";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "Welcome">;

const Register: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <>
      <StatusBar style='light' />
      <RegisterContainer>
        <TopSection>
          <TopImage source={backgroundWaves}></TopImage>
        </TopSection>
        <BottomSection>
          <BigText
            textStyles={{
              textAlign: "center",
              color: colors.white,
              marginBottom: 25,
            }}
          >
            RepXcel
          </BigText>
          <SmallText
            textStyles={{
              textAlign: "center",
              color: colors.white,
              marginBottom: 25,
            }}
          >
            The buddy to your barbell. Track your exercises now.
          </SmallText>
          <RegularButton
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Get Started
          </RegularButton>
        </BottomSection>
      </RegisterContainer>
    </>
  );
};

export default Register;
