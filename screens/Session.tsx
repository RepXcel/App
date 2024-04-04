import React, { FunctionComponent } from "react";
import { ScrollView, Image, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// navigation
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppStack";

// custom components
import { useThemeContext } from "../components/colors"; // adjust the path according to your project structure
import { Container } from "../components/shared";
import RegularButton, {
  BottomButtonContainer,
} from "../components/Buttons/RegularButton";
import RegularText from "../components/Texts/RegularText";
import { TabParamList } from "../navigation/TabNavigator";

import { useBleContext, useUserContext } from "../src/Contexts";
import rpeCalculation from "../src/backend/rpeCalculation";
import LoadingAnimation from "../components/Loading/LoadingAnimation";

const InstructionsContainer = styled(Container)`
  background-color: ${(props) => props.theme.accentBackground};
  width: 100%;
  flex: 1;
`;

type Props = StackScreenProps<TabParamList, "Display">;

const Session: FunctionComponent<Props> = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const { username } = useUserContext();
  const { calculateRPE } = rpeCalculation(username);
  const { stopStreamingData, velocityData } = useBleContext();
  const { theme } = useThemeContext(); // access the theme object

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
          {
            "Session started! Begin your exercise set now to assess your perceived exertion."
          }
        </RegularText>
      </ScrollView>
      <LoadingAnimation />
      <BottomButtonContainer>
        <RegularButton
          onPress={async () => {
            await stopStreamingData();
            console.log(velocityData.current);
            await calculateRPE(velocityData.current);
            navigation.goBack();
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: theme.tertiary,
          }}
        >
          End Session
        </RegularButton>
      </BottomButtonContainer>
    </InstructionsContainer>
  );
};

export default Session;
