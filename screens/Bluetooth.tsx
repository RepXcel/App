import React, { FunctionComponent } from "react";
import { useIsFocused } from "@react-navigation/native";
import styled from "styled-components/native";

// color components
import { colors } from "../components/colors";
import { Container } from "../components/shared";

// custom components
import DeviceCard from "../components/Cards/DataCards/BluetoothDeviceCard";
import VerticalCardList from "../components/Cards/VerticalCardList";

// data structure
import { BluetoothDevice } from "../data/dataStructure";

import { useBleContext } from "../src/Contexts";
import { Device } from "react-native-ble-plx";

const BluetoothContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
`;

// Sample data

const Bluetooth: FunctionComponent = () => {
  const isFocused = useIsFocused();
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    batteryData,
  } = useBleContext();

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  React.useEffect(() => {
    scanForDevices();
  }, [isFocused]);

  // Displaying all devices
  // React.useEffect(() => {
  //   console.log(allDevices);
  // }, [allDevices]);

  return (
    <BluetoothContainer>
      <VerticalCardList
        title='Devices'
        subtitle=''
        renderItemComponent={({ item }: { item: Device }) => (
          <DeviceCard data={{ device: item, battery: batteryData }}>
            <></>
          </DeviceCard>
        )}
        keyExtractor={(item) => item.id.toString()}
        data={allDevices}
      ></VerticalCardList>
    </BluetoothContainer>
  );
};

export default Bluetooth;
