import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components/native";
import { View, GestureResponderEvent, TouchableOpacity } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";

// colors
import { useThemeContext } from "../../colors";
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
import localStorage from "../../../src/backend/localStorage";

interface CardProps<T> {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children: ReactNode;
  data: T;
  removeSession: () => void;
}

const DisplayCard: FunctionComponent<CardProps<Session>> = (props) => {
  // Pass ID to delete session: deleteSession(props.data.id)
  const { deleteSession } = localStorage();
  const { theme } = useThemeContext();

  return (
    <ScreenCard onPress={props.onPress} data={props.data} activeOpacity={1}>
      <TopView>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <TouchableOpacity
              onPress={() => {
                console.log("Delete session: " + props.data.id);
                props.removeSession();
                deleteSession(props.data.id);
              }}
              style={{ alignSelf: "flex-start", marginLeft: "auto" }}
            >
              <IonIcon
                name='trash-outline'
                size={20}
                color={theme.accentText}
              />
            </TouchableOpacity>
          </View>
          <BarChart velocities={props.data.velocities}></BarChart>
        </View>
      </TopView>
      <BottomView>
        <BigText
          textStyles={{
            color: theme.text,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {/*get RPE*/}
          {"RPE: " + props.data.rpe}
        </BigText>
        <SmallText
          textStyles={{
            textAlign: "center",
            color: theme.accentText,
          }}
        >
          {/*get average*/}
          {"average velocity: " +
            (
              props.data.velocities.reduce(
                (acc, velocity) => acc + velocity,
                0
              ) / Math.max(1, props.data.velocities.length)
            ).toFixed(2)}
        </SmallText>
        <SmallText
          textStyles={{
            textAlign: "center",
            color: theme.accentText,
          }}
        >
          {"no. reps: " + props.data.velocities.length}
        </SmallText>
      </BottomView>
    </ScreenCard>
  );
};

export default DisplayCard;
