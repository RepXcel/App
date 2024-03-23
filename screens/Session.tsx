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

import { useBleContext, useUserContext } from "../src/Contexts";
import rpeCalculation from "../src/backend/rpeCalculation";

const InstructionsContainer = styled(Container)`
  background-color: ${colors.primary};
  width: 100%;
  flex: 1;
`;

type Props = StackScreenProps<RootStackParamList, "TabNavigator"> &
  StackScreenProps<TabParamList, "Display">;

const Session: FunctionComponent<Props> = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const { username } = useUserContext();
  const { calculateRPE } = rpeCalculation(username);
  const { stopStreamingData, velocityData } = useBleContext();

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
          {"Session in progress. Please wait for the session to end."}
        </RegularText>
      </ScrollView>
      <Image
        source={require("../assets/loading.gif")}
        style={{ width: width - 90, height: width - 90 }}
      />
      <BottomButtonContainer>
        <RegularButton
          onPress={async () => {
            await stopStreamingData();
            console.log(velocityData.current);
            await calculateRPE(velocityData.current);
            navigation.navigate("Display");
          }}
          btnStyles={{
            marginBottom: 20,
          }}
        >
          End Session
        </RegularButton>
      </BottomButtonContainer>
    </InstructionsContainer>
  );
};

export default Session;
