/* eslint-disable no-bitwise */
import { useMemo, useRef, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
	BleError,
	BleManager,
	Characteristic,
	Device,
	Subscription,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";

import base64Decode from "./base64Decode";

//CHANGE THESE TO CORRECT UUIDS
const SERVICE_UUID = "f3641400-00b0-4240-ba50-05ca45bf8abc";
const CHARACTERISTIC_UUID = "f3641401-00b0-4240-ba50-05ca45bf8abc";


export interface BluetoothLowEnergyApi {
	requestPermissions(): Promise<boolean>;
	scanForPeripherals(): void;
	connectToDevice: (deviceId: Device) => Promise<void>;
	startStreamingData: () => void;
	stopStreamingData: () => Promise<void>;
	disconnectFromDevice: () => void;
	connectedDevice: Device | null;
	allDevices: Device[];
	data: number;
	velocityData: React.MutableRefObject<number[]>;
}

function useBLE(): BluetoothLowEnergyApi {
	const bleManager = useMemo(() => new BleManager(), []);
	const [allDevices, setAllDevices] = useState<Device[]>([]);
	const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
	const [data, setData] = useState<number>(0);
	const [subscription, setSubscription] = useState<Subscription>();
	const velocityData = useRef<number[]>([]);
	let localTimestamp = 0;

	// BLE Permission Requests for Android 31
	const requestAndroid31Permissions = async () => {
		const bluetoothScanPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
			{
				title: "Bluetooth Scan Permission",
				message: "Bluetooth Low Energy requires Bluetooth Scan",
				buttonPositive: "OK",
			}
		);
		const bluetoothConnectPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
			{
				title: "Bluetooth Connect Permission",
				message: "Bluetooth Low Energy requires Bluetooth Connect",
				buttonPositive: "OK",
			}
		);
		const fineLocationPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: "Location Permission",
				message: "Bluetooth Low Energy requires Location",
				buttonPositive: "OK",
			}
		);

		return (
			bluetoothScanPermission === "granted" &&
			bluetoothConnectPermission === "granted" &&
			fineLocationPermission === "granted"
		);
	};

	const requestPermissions = async () => {
		if (Platform.OS === "android") {
			if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title: "Location Permission",
						message: "Bluetooth Low Energy requires Location",
						buttonPositive: "OK",
					}
				);
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} else {
				const isAndroid31PermissionsGranted =
					await requestAndroid31Permissions();

				return isAndroid31PermissionsGranted;
			}
		} else {
			return true;
		}
	};

	const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
		devices.findIndex((device) => nextDevice.id === device.id) > -1;

	const scanForPeripherals = () =>
		bleManager.startDeviceScan(null, null, (error, device) => {
			if (error) {
				console.log(error);
			}
			if (device && device.name?.toLowerCase().includes("repxcel")) {
				setAllDevices((prevState: Device[]) => {
					if (!isDuplicateDevice(prevState, device)) {
						return [...prevState, device];
					}
					return prevState;
				});
			}
		});

	const connectToDevice = async (device: Device) => {
		try {
			const deviceConnection = await bleManager.connectToDevice(device.id);
			setConnectedDevice(deviceConnection);
			await deviceConnection.discoverAllServicesAndCharacteristics();
			console.log("Connected to Device", deviceConnection.name);
			bleManager.stopDeviceScan();
		} catch (e) {
			console.log("FAILED TO CONNECT", e);
		}
	};

	const disconnectFromDevice = () => {
		if (connectedDevice) {
			bleManager.cancelDeviceConnection(connectedDevice.id);
			setConnectedDevice(null);
			setData(0);
		}
	};

	const listener = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			console.log("No Data was received");
			return -1;
		}

		const rawData = characteristic.value;
		// console.log("Raw Data", rawData);
		const { velocity, timestamp } = base64Decode(rawData);
		console.log("Velocity", velocity, "Timestamp", timestamp, "Local Timestamp", localTimestamp);


		// Parse the Data into proper velocity values
		// setData(velocity);
		if (timestamp === 0 && velocity === 0) {
			console.log("Resetting Data")
			velocityData.current = [];
		}
		else if (velocityData.current.length === 0) {
			console.log("First Data point", velocity);
			velocityData.current.push(velocity);
			localTimestamp = timestamp;
		}
		else if (timestamp != localTimestamp) {
			console.log("Data point", velocity);
			velocityData.current.push(velocity);
			localTimestamp = timestamp;
		}
		console.log(velocityData.current);
	};

	const startStreamingData = () => {
		localTimestamp = 0;
		if (connectedDevice && subscription === undefined) {
			//Start Streaming Data
			setSubscription(
				connectedDevice.monitorCharacteristicForService(
					SERVICE_UUID,
					CHARACTERISTIC_UUID,
					listener
				)
			);
		} else if (!connectedDevice) {
			console.log("No Device Connected");
		} else {
			console.log("Already Streaming Data");
		}
	};

	const stopStreamingData = async () => {
		if (subscription) {
			subscription.remove();
			setSubscription(undefined);
			//Wait another second for all data to go through
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	};

	return {
		scanForPeripherals,
		requestPermissions,
		connectToDevice,
		startStreamingData,
		stopStreamingData,
		allDevices,
		connectedDevice,
		disconnectFromDevice,
		data,
		velocityData,
	};
}

export default useBLE;