import { Device } from "react-native-ble-plx";


export interface Session {
  startDate: Date;
  id: string;
  rpe: number;
  velocities: number[];
}

export interface User {
  id: number;
  username: string;
  password: string;
  calibration: number;
  timeout: number;
  sessions: Session[];
}

export interface BluetoothDevice {
  id: number;
  name: string;
  connected: boolean;
  device: Device;
}
