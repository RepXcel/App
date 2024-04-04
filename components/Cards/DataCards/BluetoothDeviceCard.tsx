import React, { FunctionComponent, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

// custom components
import WideCard from "../WideCard";
import RegularText from "../../Texts/RegularText";
import { useThemeContext } from "../../colors";
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
  changeBattery: () => void;
};

const DeviceCard: FunctionComponent<CardProps<DeviceTypeProp>> = (props) => {
  const { theme } = useThemeContext();
  const { connectToDevice, disconnectFromDevice, connectedDevice } = useBleContext();

  return (
    <WideCard
      onPress={() => {
        if (props.data.device.id !== connectedDevice?.id) {
          connectToDevice(props.data.device);
          props.data.changeBattery();
        }
        else {
          console.log("disconnecting from device");
          disconnectFromDevice();
        }
      }}
      data={props.data}
      viewStyles={
        props.data.device.id == connectedDevice?.id
          ? {
            borderWidth: 2,
            borderColor: theme.primary,
          }
          : {
            borderWidth: 1,
            borderColor: theme.accentGray,
          }
      }
    >
      <LeftView>
        <View>
          <RegularText
            textStyles={
              props.data.device.id == connectedDevice?.id
                ? {
                  color: theme.primary,
                  fontWeight: "bold",
                }
                : {
                  color: theme.accentText,
                  fontWeight: "normal",
                }
            }
          >
            {props.data.device.name}
          </RegularText>
          <SmallText
            textStyles={{
              textAlign: "left",
              color: theme.accentText,
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
            color:
              props.data.device.id == connectedDevice?.id
                ? theme.primary
                : theme.accentText,
            fontWeight:
              props.data.device.id == connectedDevice?.id ? "bold" : "normal",
          }}
        >
          {/*get average*/}
          {props.data.device.id === connectedDevice?.id ? "connected" : "paired"}
        </SmallText>
        <SmallText
          textStyles={{
            textAlign: "right",
            color: theme.accentText,
          }}
        >
          {"battery: " + props.data.battery + "%"}
        </SmallText>
      </RightView>
    </WideCard>
  );
};
export default DeviceCard;
