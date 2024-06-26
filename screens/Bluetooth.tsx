import React, { FunctionComponent } from "react";
import { useIsFocused } from "@react-navigation/native";
import styled from "styled-components/native";

// color components
import { useThemeContext } from "../components/colors";
import { Container } from "../components/shared";

// custom components
import DeviceCard from "../components/Cards/DataCards/BluetoothDeviceCard";
import VerticalCardList from "../components/Cards/VerticalCardList";

// data structure
import { BluetoothDevice } from "../data/dataStructure";

import { useBleContext } from "../src/Contexts";
import { Device } from "react-native-ble-plx";

const BluetoothContainer = styled(Container)`
  background-color: ${(props) => props.theme.accentBackground};
  width: 100%;
  flex: 1;
`;

// Sample data

const Bluetooth: FunctionComponent = () => {
  const { theme } = useThemeContext();

  const [devices, setDevices] = React.useState<BluetoothDevice[]>([]);
  const isFocused = useIsFocused();
  const { requestPermissions, scanForPeripherals, allDevices, batteryData } = useBleContext();

  const [batteryDataState, setBatteryDataState] = React.useState<number>(0);

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  React.useEffect(() => {
    scanForDevices();
  }, []);

  React.useEffect(() => {
    if (isFocused) { setBatteryDataState(batteryData.current); }
  }, [isFocused]);

  const changeBatteryData = async () => {
    while (batteryData.current == 0) {
      await new Promise(r => setTimeout(r, 500));
    }
    setBatteryDataState(batteryData.current);
  };

  // Displaying all devices
  // React.useEffect(() => {
  //   console.log(allDevices);
  // }, [allDevices]);

  return (
    <BluetoothContainer theme={theme}>
      <VerticalCardList
        title='Devices'
        subtitle=''
        renderItemComponent={({ item }: { item: Device }) => (
          <DeviceCard data={{ device: item, battery: batteryDataState, changeBattery: changeBatteryData }}>
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
