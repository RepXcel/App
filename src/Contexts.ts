import { createContext, useContext } from "react";
import useBLE from "./backend/useBLE";

export type BleContextType = ReturnType<typeof useBLE>;

export const BleContext = createContext<BleContextType>(
    {} as BleContextType
);

export const useBleContext = () => useContext(BleContext);

