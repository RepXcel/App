import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components/native";
import { View, GestureResponderEvent } from "react-native";

// colors
import { colors } from "../../colors";
import RegularText from "../../Texts/RegularText";
import SmallText from "../../Texts/SmallText";
import WideCard from "../WideCard";

const LeftView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
  align-items: center;
  flex: 2;
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
  return (
    <WideCard onPress={props.onPress} data={props.data}>
      <LeftView>
        <View>
          <RegularText
            textStyles={{
              color: colors.secondary,
              textAlign: "left",
              marginBottom: 5,
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
            {"average velocity: " + props.data.velocities[0].velocity}
          </SmallText>
        </View>
      </LeftView>
      <RightView>
        <RegularText
          textStyles={{
            color: colors.primary,
            fontWeight: "bold",
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
          {/* {"id :" + props.data.id} */}
          {""}
        </SmallText>
      </RightView>
    </WideCard>
  );
};

export default HistoryEntryCard;
