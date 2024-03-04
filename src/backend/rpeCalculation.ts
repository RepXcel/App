import localStorage from './localStorage';
import useBLE from './useBLE';

const { calibrateRPE, addNewSession } = localStorage();
const {
    connectToDevice,
    connectedDevice,
    data,
    disconnectFromDevice,
} = useBLE();
interface rpeCalculationApi {

}

function rpeCalculation(): rpeCalculationApi {
    return {

    }
}

export default rpeCalculation;