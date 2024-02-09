import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { colors } from "../components/colors";
import { Container } from "../components/shared";
import RegularButton, {
  BottomButtonContainer,
} from "../components/Buttons/RegularButton";
import { StackScreenProps } from "@react-navigation/stack";
import { TabParamList } from "../navigation/TabNavigator";
import { sessionData } from "../assets/tempdata/tempData";
import ScreenCard from "../components/Cards/ScreenCard";
import HorizontalCardList from "../components/Cards/HorizontalCardList";
import { Session } from "../data/dataStructure";
import VerticalCardList from "../components/Cards/VerticalCardList";
import HistoryEntryCard from "../components/Cards/DataCards/HistoryEntryCard";
import DisplayCard from "../components/Cards/DataCards/DisplayCard";

const DisplayContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
  justify-content: flex-end;
`;

type Props = StackScreenProps<TabParamList, "Display">;

const Display: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <DisplayContainer>
      <StatusBar style='dark' />
      <HorizontalCardList
        title='Entries'
        subtitle='Newest'
        renderItemComponent={({ item }: { item: Session }) => (
          <DisplayCard data={item}>
            <></>
          </DisplayCard>
        )}
        keyExtractor={(item) => item.id.toString()}
        data={sessionData}
      />
      <BottomButtonContainer>
        <RegularButton
          onPress={() => {}}
          btnStyles={{
            marginBottom: 20,
          }}
        >
          Start Session
        </RegularButton>
        <RegularButton
          onPress={() => {}}
          btnStyles={{
            marginBottom: 20,
          }}
        >
          End Session
        </RegularButton>
      </BottomButtonContainer>
    </DisplayContainer>
  );
};

export default Display;
