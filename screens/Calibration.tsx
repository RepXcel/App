import React, { FunctionComponent } from "react";
import { ScrollView, Image, Dimensions } from "react-native";
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
import LoadingAnimation from "../components/Loading/LoadingAnimation";

import { useBleContext, useUserContext } from "../src/Contexts";
import rpeCalculation from "../src/backend/rpeCalculation";

const InstructionsContainer = styled(Container)`
  background-color: ${(props) => props.theme.accentBackground};
  width: 100%;
  flex: 1;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator"> &
  StackScreenProps<TabParamList, "Display">;

const Calibration: FunctionComponent<Props> = ({ navigation }) => {
  const { theme } = useThemeContext();

  const { width } = Dimensions.get("window");
  const { username } = useUserContext();
  const { calibrate } = rpeCalculation(username);
  const { stopStreamingData, velocityData } = useBleContext();

  return (
    <InstructionsContainer theme={theme}>
      <ScrollView>
        <RegularText
          textStyles={{
            fontSize: 19,
            marginTop: 20,
            marginHorizontal: 15,
            marginBottom: 50,
            textAlign: "center",
          }}
        >
          {
            "Perform a set at your highest effort level to establish a baseline for measuring perceived exertion."
          }
        </RegularText>
        <LoadingAnimation />
      </ScrollView>
      <BottomButtonContainer>
        <RegularButton
          onPress={async () => {
            await stopStreamingData();
            console.log(velocityData.current);
            calibrate(velocityData.current);
            navigation.goBack();
          }}
          btnStyles={{
            marginBottom: 20,
            backgroundColor: theme.tertiary,
          }}
        >
          Finish Calibration
        </RegularButton>
      </BottomButtonContainer>
    </InstructionsContainer>
  );
};

export default Calibration;
