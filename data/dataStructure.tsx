import { Device } from "react-native-ble-plx";

export interface Velocity {
  rep: number;
  velocity: number;
}

export interface Session {
  startDate: Date;
  id: number;
  velocities: Velocity[];
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
