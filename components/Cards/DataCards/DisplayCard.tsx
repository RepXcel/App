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
  flex: 8;
`;

const BottomView = styled.View`
  flex: 3;
`;

//types
import { Session } from "../../../data/dataStructure";
import ScreenCard from "../ScreenCard";
import BarChart from "../../Charts/BarChart";
import BigText from "../../Texts/BigText";

interface CardProps<T> {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children: ReactNode;
  data: T;
}

const HistoryEntryCard: FunctionComponent<CardProps<Session>> = (props) => {
  return (
    <ScreenCard onPress={props.onPress} data={props.data} activeOpacity={1}>
      <TopView>
        <View>
          <RegularText
            textStyles={{
              textAlign: "left",
              marginBottom: 25,
            }}
          >
            {props.data.startDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }) +
              " | " +
              props.data.startDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
          </RegularText>

          <BarChart velocities={props.data.velocities}></BarChart>
        </View>
      </TopView>
      <BottomView>
        <BigText
          textStyles={{
            color: colors.secondary,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {/*get RPE*/}
          {"RPE: " +
            props.data.rpe
          }
        </BigText>
        <SmallText
          textStyles={{
            textAlign: "center",
            color: colors.darkgray,
          }}
        >
          {/*get average*/}
          {"average velocity: " +
            (props.data.velocities.reduce(
              (acc, velocity) => acc + velocity,
              0
            ) /
              Math.max(1, props.data.velocities.length)).toFixed(2)}
        </SmallText>
        <SmallText
          textStyles={{
            textAlign: "center",
            color: colors.darkgray,
          }}
        >
          {"no. reps: " + props.data.velocities.length}
        </SmallText>
      </BottomView>
    </ScreenCard>
  );
};

export default HistoryEntryCard;
