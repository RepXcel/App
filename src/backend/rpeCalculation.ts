import { useEffect, useMemo, useState } from 'react';
import localStorage from './localStorage';

const { calibrateRPE, addNewSession, retrieveData } = localStorage();
interface rpeCalculationApi {
    startCalibration(): void;
    stopCalibration(): void;
    startSession(): void;
    stopSession(): void;
}

function rpeCalculation(username: string, useBLEProp: any): rpeCalculationApi {
    const velocityData: number[] = [];
    const [inProcess, setInProcess] = useState(false);

    const { startStreamingData, stopStreamingData, connectedDevice, data } = useBLEProp();

    const startCalibration = async () => {
        if (connectedDevice) {
            await startStreamingData();
            setInProcess(true);
            while (inProcess) {
                if (velocityData.length == 0) {
                    velocityData.push(data);
                }
                else if (data != velocityData[velocityData.length - 1]) {
                    velocityData.push(data);
                }
            }
        }
    }

    const stopCalibration = async () => {
        if (connectedDevice) {
            await stopStreamingData();
            setInProcess(false);
            const rpe10 = Math.max(...velocityData);
            const rpe0 = Math.min(...velocityData);
            //TODO: Fetch/pass user name here
            await calibrateRPE(username, rpe10, rpe0);
        }
    }

    const stopSession = async () => {
        if (connectedDevice) {
            await stopStreamingData();
            setInProcess(false);
            const lastThreeReps = velocityData.slice(-3);
            let rpe = 0;
            const slowestVelocity = Math.min(...lastThreeReps);
            const user = await retrieveData(username);

            if (user) {
                const rpe10 = user.rpe10Velocity;
                const rpe0 = user.rpe0Velocity;
                if (rpe10 && rpe0) {
                    const rpeRange = 10;
                    const velocityRange = rpe10 - rpe0;
                    rpe = 0 + (rpeRange / velocityRange) * (slowestVelocity - rpe0);
                    rpe = Math.round(rpe);
                    if (rpe > 10) {
                        rpe = 10;
                    } else if (rpe < 0) {
                        rpe = 0;
                    }
                }
            }
            await addNewSession(username, velocityData, rpe);
        }
    }
    return {
        startCalibration,
        stopCalibration,
        startSession: startCalibration,
        stopSession
    }
}

export default rpeCalculation;