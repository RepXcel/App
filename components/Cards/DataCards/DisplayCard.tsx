import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components/native";
import { View, GestureResponderEvent } from "react-native";

// colors
import { colors } from "../../colors";
import RegularText from "../../Texts/RegularText";
import SmallText from "../../Texts/SmallText";

const TopView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
  align-items: top;
  flex: 2;
  border: 1px red;
`;

const BottomView = styled.View`
  border: 1px red;
  flex: 1;
`;

//types
import { Session } from "../../../data/dataStructure";
import ScreenCard from "../ScreenCard";

interface CardProps<T> {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children: ReactNode;
  data: T;
}

const HistoryEntryCard: FunctionComponent<CardProps<Session>> = (props) => {
  return (
    <ScreenCard onPress={props.onPress} data={props.data}>
      <TopView>
        <View>
          <RegularText
            textStyles={{
              color: colors.secondary,
              textAlign: "left",
              marginBottom: 5,
              borderColor: "red",
              borderWidth: 1,
            }}
          >
            {props.data.startDate.toDateString()}
          </RegularText>
          <SmallText
            textStyles={{
              textAlign: "left",
              color: colors.darkgray,
            }}
          >
            {props.data.id}
          </SmallText>
        </View>
      </TopView>
      <BottomView>
        <RegularText
          textStyles={{
            color: colors.secondary,
            textAlign: "right",
            marginBottom: 5,
          }}
        >
          {/*get RPE*/}
          {"RPE: " + props.data.velocities[0].velocity}
        </RegularText>
        <SmallText
          textStyles={{
            textAlign: "right",
            color: colors.darkgray,
          }}
        >
          {/*get average*/}
          {"avaerge: " + props.data.velocities[0].velocity}
        </SmallText>
      </BottomView>
    </ScreenCard>
  );
};

export default HistoryEntryCard;
