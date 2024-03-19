import { createContext, useContext } from "react";
import useBLE from "./backend/useBLE";

export type BleContextType = ReturnType<typeof useBLE>;

export const BleContext = createContext<BleContextType>(
    {} as BleContextType
);

type user = {
    username: string,
    setUsername: (username: string) => void
}

export const UserContext = createContext<user>({} as user);

export const useUserContext = () => useContext(UserContext);
export const useBleContext = () => useContext(BleContext);

