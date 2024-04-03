import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components/native";
import { View, GestureResponderEvent, TouchableOpacity } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import localStorage from "../../../src/backend/localStorage";

// colors
import { useThemeContext } from "../../colors";
import RegularText from "../../Texts/RegularText";
import SmallText from "../../Texts/SmallText";
import WideCard from "../WideCard";

const LeftView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
  align-items: center;
  flex: 3;
  vertical-align: top;
`;

const RightView = styled.View`
  flex: 1;
`;

//types
import { Session } from "../../../data/dataStructure";

interface CardProps<T> {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children: ReactNode;
  data: T;
}

const HistoryEntryCard: FunctionComponent<CardProps<Session>> = (props) => {
  const { theme } = useThemeContext();
  const { deleteSession } = localStorage();

  return (
    <WideCard onPress={props.onPress} data={props.data}>
      <LeftView>
        <View>
          <RegularText
            textStyles={{
              textAlign: "left",
              marginBottom: 5,
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
          <SmallText
            textStyles={{
              textAlign: "left",
              color: theme.accentText,
            }}
          >
            {"average velocity: " +
              (
                props.data.velocities.reduce(
                  (acc, velocity) => acc + velocity,
                  0
                ) / Math.max(1, props.data.velocities.length)
              ).toFixed(2)}
          </SmallText>
        </View>
      </LeftView>
      <RightView>
        <RegularText
          textStyles={{
            color: theme.primary,
            fontWeight: "bold",
            textAlign: "right",
            marginBottom: 5,
          }}
        >
          {"RPE: " + props.data.rpe}
        </RegularText>
        <TouchableOpacity
          onPress={() => {
            console.log("Delete session: " + props.data.id);
            deleteSession(props.data.id);
          }}
          style={{ alignSelf: "flex-start", marginLeft: "auto" }}
        >
          <IonIcon name='trash-outline' size={20} color={theme.accentText} />
        </TouchableOpacity>
      </RightView>
    </WideCard>
  );
};

export default HistoryEntryCard;
