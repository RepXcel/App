import React, { FunctionComponent, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

// custom components
import WideCard from "../WideCard";
import RegularText from "../../Texts/RegularText";
import { colors } from "../../colors";
import SmallText from "../../Texts/SmallText";

// data structures
import { CardProps } from "../types";
import { Device } from "react-native-ble-plx";

import { useBleContext } from "../../../src/Contexts";

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

const DeviceCard: FunctionComponent<CardProps<Device>> = (props) => {
  const { connectToDevice, connectedDevice } = useBleContext();

  return (
    <WideCard
      onPress={() => {
        if (props.data !== connectedDevice) {
          connectToDevice(props.data);
        }
      }}
      data={props.data}
      viewStyles={
        props.data.id == connectedDevice?.id
          ? {
            borderWidth: 2,
            borderColor: colors.primary,
          }
          : {
            borderWidth: 1,
            borderColor: colors.gray,
          }
      }
    >
      <LeftView>
        <View>
          <RegularText
            textStyles={
              props.data.id == connectedDevice?.id
                ? {
                  color: colors.primary,
                  fontWeight: "bold",
                }
                : {
                  color: colors.black,
                  fontWeight: "normal",
                }
            }
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
            color: props.data.id == connectedDevice?.id ? colors.primary : colors.darkgray,
            fontWeight: props.data.id == connectedDevice?.id ? "bold" : "normal",
          }}
        >
          {/*get average*/}
          {props.data === connectedDevice ? "connected" : "paired"}
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
