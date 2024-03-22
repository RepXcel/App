import { createContext, useContext } from "react";
import useBLE from "./backend/useBLE";
import { BluetoothLowEnergyApi } from "./backend/useBLE";


export const BleContext = createContext<BluetoothLowEnergyApi>(
    {} as BluetoothLowEnergyApi
);

type user = {
    username: string,
    setUsername: (username: string) => void
}

export const UserContext = createContext<user>({} as user);

export const useUserContext = () => useContext(UserContext);
export const useBleContext = () => useContext(BleContext);

