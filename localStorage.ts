import { DataStore } from 'aws-amplify/datastore';
import { User } from "./src/models";

interface LocalStorageApi {
    saveData(data: string): void;
    retrieveData(): Promise<string | undefined>;
    clearData(): void;
}

function localStorage(): LocalStorageApi {
    const saveData = async (data: string) => {
        try {
            const post = await DataStore.save(
                new User({
                    username: data,
                })
            );
            console.log('Username saved successfully!', post);
        } catch (error) {
            console.log('Error saving username', error);
        }
    }

    const retrieveData = async () => {
        try {
            const users = await DataStore.query(User);
            console.log('Users retrieved successfully!');
            return JSON.stringify(users, null, 2);
        } catch (error) {
            console.log('Error retrieving Users', error);
        }
    }

    const clearData = async () => {
        try {
            await DataStore.clear();
            console.log('User cleared successfully!');
        } catch (error) {
            console.log('Error deleting User', error);
        }
    }

    return {
        saveData,
        retrieveData,
        clearData
    }
}

export default localStorage;