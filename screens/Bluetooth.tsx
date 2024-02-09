import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

// color components
import { colors } from "../components/colors";
import { Container } from "../components/shared";

// custom components
import DeviceCard from "../components/Cards/DataCards/BluetoothDeviceCard";
import VerticalCardList from "../components/Cards/VerticalCardList";

// data structure
import { BluetoothDevice } from "../data/dataStructure";
import { deviceData } from "../assets/tempdata/tempData";

const BluetoothContainer = styled(Container)`
  background-color: ${colors.lightgray};
  width: 100%;
  flex: 1;
`;

// Sample data

const Bluetooth: FunctionComponent = () => {
  return (
    <BluetoothContainer>
      <VerticalCardList
        title='Devices'
        subtitle=''
        renderItemComponent={({ item }: { item: BluetoothDevice }) => (
          <DeviceCard data={item}>
            <></>
          </DeviceCard>
        )}
        keyExtractor={(item) => item.id.toString()}
        data={deviceData}
      ></VerticalCardList>
    </BluetoothContainer>
  );
};

export default Bluetooth;
