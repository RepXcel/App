import React, { startTransition, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import '@azure/core-asynciterator-polyfill';


import localStorage from "./src/backend/localStorage";
import useBLE from "./src/backend/useBLE";
import DeviceModal from "./src/backend/DeviceConnectionModal";
import rpeCalculation from "./src/backend/rpeCalculation";

const App = () => {
  const { createUser, calibrateRPE, clearData, retrieveData } = localStorage();
  const { calibrate, calculateRPE } = rpeCalculation("User1");
  useEffect(() => {
    createUser("User1");
  }, []);
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    data,
    disconnectFromDevice,
    startStreamingData,
    stopStreamingData,
    velocityData
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);


  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  const finishCalibration = async () => {
    await stopStreamingData()
    await calibrate(velocityData);
  };

  const finishSession = async () => {
    await stopStreamingData()
    await calculateRPE(velocityData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <>
            <Text style={styles.heartRateTitleText}>
              {connectedDevice.name}
            </Text>
            <Text style={styles.heartRateText}>{data}</Text>
          </>
        ) : (
          <Text style={styles.heartRateTitleText}>
            Please Connect to a Device
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => { startStreamingData() }}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {"Start Reading Data"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          finishCalibration();
        }}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {"Stop Calibration"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          finishSession();
        }}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {"Stop Session"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default App;