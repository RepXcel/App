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

const DeviceCard: FunctionComponent<CardProps<Device>> = (props) => {
  const { theme } = useThemeContext();

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
              props.data.id == connectedDevice?.id
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
            {props.data.name}
          </RegularText>
          <SmallText
            textStyles={{
              textAlign: "left",
              color: theme.accentText,
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
            color:
              props.data.id == connectedDevice?.id
                ? theme.primary
                : theme.accentText,
            fontWeight:
              props.data.id == connectedDevice?.id ? "bold" : "normal",
          }}
        >
          {/*get average*/}
          {props.data === connectedDevice ? "connected" : "paired"}
        </SmallText>
        <SmallText
          textStyles={{
            textAlign: "right",
            color: theme.accentText,
          }}
        >
          {"id: " + props.data.id}
        </SmallText>
      </RightView>
    </WideCard>
  );
};
export default DeviceCard;
