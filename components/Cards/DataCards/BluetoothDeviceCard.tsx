import React, { FunctionComponent } from "react";
import { GestureResponderEvent, View } from "react-native";
import styled from "styled-components/native";

// custom components
import WideCard from "../WideCard";
import VerticalCardList from "../VerticalCardList";
import RegularText from "../../Texts/RegularText";
import { colors } from "../../colors";
import SmallText from "../../Texts/SmallText";

// data structures
import { CardProps } from "../types";
import { BluetoothDevice } from "../../../data/dataStructure";

const LeftView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
  align-items: center;
  flex: 2;
`;

const RightView = styled.View`
  flex: 1;
`;

const DeviceCard: FunctionComponent<CardProps<BluetoothDevice>> = (props) => {
  return (
    <WideCard
      onPress={props.onPress}
      data={props.data}
      viewStyles={{
        borderColor: props.data.connected ? colors.primary : colors.gray,
        backgroundColor: props.data.connected ? colors.lightgray : colors.white,
      }}
    >
      <LeftView>
        <View>
          <RegularText
            textStyles={{
              color: props.data.connected ? colors.primary : colors.secondary,
              fontWeight: props.data.connected ? "bold" : "normal",
              textAlign: "left",
              // marginBottom: 5,
            }}
          >
            {props.data.name}
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
      </LeftView>
      <RightView>
        <SmallText
          textStyles={{
            textAlign: "right",
            color: props.data.connected ? colors.primary : colors.darkgray,
            fontWeight: props.data.connected ? "bold" : "normal",
          }}
        >
          {/*get average*/}
          {props.data.connected ? "connected" : "paired"}
        </SmallText>
        <SmallText
          textStyles={{
            textAlign: "right",
            color: colors.darkgray,
          }}
        >
          {"id: " + props.data.id}
        </SmallText>
      </RightView>
    </WideCard>
  );
};
export default DeviceCard;
