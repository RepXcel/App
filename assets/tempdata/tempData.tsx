import { BluetoothDevice, Session } from "../../data/dataStructure";

export const sessionData: Session[] = [
  {
    startDate: new Date("2022-01-01"),
    id: 1,
    velocities: [
      { rep: 1, velocity: 10 },
      { rep: 2, velocity: 12 },
      { rep: 3, velocity: 14 },
      { rep: 4, velocity: 16 },
      { rep: 5, velocity: 18 },
    ],
  },
  {
    startDate: new Date("2022-01-02"),
    id: 2,
    velocities: [{ rep: 1, velocity: 15 }],
  },
  {
    startDate: new Date("2022-01-03"),
    id: 3,
    velocities: [{ rep: 1, velocity: 20 }],
  },
  {
    startDate: new Date("2022-01-04"),
    id: 4,
    velocities: [{ rep: 1, velocity: 25 }],
  },
  {
    startDate: new Date("2022-01-05"),
    id: 5,
    velocities: [{ rep: 1, velocity: 30 }],
  },
  {
    startDate: new Date("2022-01-06"),
    id: 6,
    velocities: [{ rep: 1, velocity: 35 }],
  },
  // Add more data as needed
];

export const deviceData: BluetoothDevice[] = [
  {
    id: 1,
    name: "Device 1",
    connected: false,
    art: {
      icon: "icon1",
      background: "background1",
    },
  },
  {
    id: 2,
    name: "Device 2",
    connected: true,
    art: {
      icon: "icon2",
      background: "background2",
    },
  },
  // Add more data as needed
];
