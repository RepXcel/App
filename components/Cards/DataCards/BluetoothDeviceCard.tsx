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

type DeviceTypeProp = {
  device: Device;
  battery: number;
};

const DeviceCard: FunctionComponent<CardProps<DeviceTypeProp>> = (props) => {
  const { connectToDevice, connectedDevice } = useBleContext();

  return (
    <WideCard
      onPress={() => {
        if (props.data.device !== connectedDevice) {
          connectToDevice(props.data.device);
        }
      }}
      data={props.data}
      viewStyles={
        props.data.device.id == connectedDevice?.id
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
              props.data.device.id == connectedDevice?.id
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
            {props.data.device.name}
          </RegularText>
          <SmallText
            textStyles={{
              textAlign: "left",
              color: colors.darkgray,
            }}
          >
            {props.data.device.id}
          </SmallText>
        </View>
      </LeftView>
      <RightView>
        <SmallText
          textStyles={{
            textAlign: "right",
            color: props.data.device.id == connectedDevice?.id ? colors.primary : colors.darkgray,
            fontWeight: props.data.device.id == connectedDevice?.id ? "bold" : "normal",
          }}
        >
          {props.data.device === connectedDevice ? "connected" : "paired"}
        </SmallText>
        <SmallText
          textStyles={{
            textAlign: "right",
            color: colors.darkgray,
          }}
        >
          {"battery: " + props.data.battery + "%"}
        </SmallText>
      </RightView>
    </WideCard>
  );
};
export default DeviceCard;
