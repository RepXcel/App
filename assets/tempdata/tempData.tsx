import { BluetoothDevice, Session } from "../../data/dataStructure";

export const sessionData: Session[] = [
  {
    startDate: new Date("2022-01-01"),
    id: 1,
    velocities: [
      { datetime: new Date("2022-01-01T10:11:00"), velocity: 10 },
      { datetime: new Date("2022-01-01T10:11:05"), velocity: 12 },
      { datetime: new Date("2022-01-01T10:11:10"), velocity: 14 },
      { datetime: new Date("2022-01-01T10:11:15"), velocity: 16 },
      { datetime: new Date("2022-01-01T10:11:20"), velocity: 18 },
    ],
  },
  {
    startDate: new Date("2022-01-02"),
    id: 2,
    velocities: [{ datetime: new Date("2022-01-02"), velocity: 15 }],
  },
  {
    startDate: new Date("2022-01-03"),
    id: 3,
    velocities: [{ datetime: new Date("2022-01-03"), velocity: 20 }],
  },
  {
    startDate: new Date("2022-01-04"),
    id: 4,
    velocities: [{ datetime: new Date("2022-01-04"), velocity: 25 }],
  },
  {
    startDate: new Date("2022-01-05"),
    id: 5,
    velocities: [{ datetime: new Date("2022-01-05"), velocity: 30 }],
  },
  {
    startDate: new Date("2022-01-06"),
    id: 6,
    velocities: [{ datetime: new Date("2022-01-06"), velocity: 35 }],
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
