import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

//custom components
import colors, { useThemeContext } from "../components/colors";
import { Container } from "../components/shared";
import BigText from "../components/Texts/BigText";
import SmallText from "../components/Texts/SmallText";
import RegularButton from "../components/Buttons/RegularButton";

const RegisterContainer = styled(Container)`
  background-color: transparent;
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

// types
import { RootStackParamList } from "../navigation/AppStack";
import { StackScreenProps } from "@react-navigation/stack";

import { getCurrentUser } from "aws-amplify/auth";

import { useUserContext } from "../src/Contexts";

// Storage import for testing purposes
import { DataStore } from "aws-amplify/datastore";
import localStorage from "../src/backend/localStorage";
import rpeCalculation from "../src/backend/rpeCalculation";
import { ImageBackground } from "react-native";

type Props = StackScreenProps<RootStackParamList, "Welcome">;

const Register: FunctionComponent<Props> = ({ navigation }) => {
  const { theme } = useThemeContext();
  const { setUsername } = useUserContext();

  // Local storage for testing purposes
  const {
    createUser,
    calibrateRPE,
    addNewSession,
    retrieveData,
    clearData,
    retrieveSessionData,
  } = localStorage();

  // const { calculateRPE } = rpeCalculation("test");

  // Things that needs to run once on start up
  // useEffect(() => {
  //   startUp();
  // }, []);

  // async function startUp() {
  //   await clearData();
  // }

  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      if (username && userId) {
        setUsername(username);
        navigation.navigate("TabNavigator");
      }
    } catch (err) {
      navigation.navigate("Login");
    }
  }

  return (
    <>
      <StatusBar style='light' />
      <ImageBackground
        source={require("../assets/background.gif")}
        style={{ flex: 1 }}
        resizeMode='cover'
      >
        <RegisterContainer>
          <TopSection />
          <BottomSection>
            <BigText
              textStyles={{
                textAlign: "center",
                color: theme.white,
                marginBottom: 25,
              }}
            >
              RepXcel
            </BigText>
            <SmallText
              textStyles={{
                textAlign: "center",
                color: theme.white,
                marginBottom: 25,
              }}
            >
              The buddy to your barbell. Track your exercises now.
            </SmallText>
            <RegularButton
              btnStyles={{ backgroundColor: theme.primary }}
              onPress={async () => {
                await currentAuthenticatedUser();
              }}
            >
              Get Started
            </RegularButton>
          </BottomSection>
        </RegisterContainer>
      </ImageBackground>
    </>
  );
};

export default Register;
