import localStorage from './localStorage';

const { calibrateRPE, addNewSession, retrieveData } = localStorage();
interface rpeCalculationApi {
    calibrate: (velocityData: number[]) => Promise<void>;
    calculateRPE: (velocityData: number[]) => Promise<void>;
}

function rpeCalculation(username: string): rpeCalculationApi {

    const calibration = async (velocityData: number[]) => {
        const rpe10 = Math.min(...velocityData);
        const rpe0 = Math.max(...velocityData);
        await calibrateRPE(username, rpe10, rpe0);
    }

    const session = async (velocityData: number[]) => {

        const lastThreeReps = velocityData.slice(-3);
        let rpe = 0;
        const slowestVelocity = Math.min(...lastThreeReps);
        const user = await retrieveData(username);

        if (user) {
            const rpe10 = user.rpe10Velocity;
            const rpe0 = user.rpe0Velocity;
            if (rpe10 && rpe0) {
                const rpeRange = 10;
                const velocityRange = rpe0 - rpe10;
                rpe = rpeRange - (rpeRange / velocityRange) * (slowestVelocity - rpe10);
                rpe = Math.round(rpe);
                if (rpe > 10) {
                    rpe = 10;
                } else if (rpe < 0) {
                    rpe = 0;
                }
            }
            await addNewSession(username, velocityData, rpe);
        }
    }
    return {
        calibrate: calibration,
        calculateRPE: session
    }
}

export default rpeCalculation;