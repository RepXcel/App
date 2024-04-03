import { DataStore } from 'aws-amplify/datastore';
import { LazyUser, Session, User } from "../models";

interface LocalStorageApi {
    createUser(name: string): void;
    calibrateRPE(name: string, rpe10: number, rpe0: number): void;
    retrieveData(name: string): Promise<LazyUser | undefined>;
    addNewSession(name: string, velocities: number[], rpe: number): void;
    retrieveSessionData(name: string): Promise<Session[]>;
    deleteSession(id: string): void;
    clearData(): void;
}

function localStorage(): LocalStorageApi {
    const createUser = async (name: string) => {
        try {
            const post = await DataStore.save(
                new User({
                    username: name,
                })
            );
            console.log('User saved successfully!', post);
        } catch (error) {
            console.log('Error creating user', error);
        }
    }

    const calibrateRPE = async (name: string, rpe10: number, rpe0: number) => {
        const users = await DataStore.query(User, (c) => c.username.eq(name));
        try {
            const post = await DataStore.save(
                User.copyOf(users[0], updated => {
                    updated.rpe10Velocity = rpe10;
                    updated.rpe0Velocity = rpe0;
                })
            );
            console.log('User saved successfully!', post);
        } catch (error) {
            console.log('Error updating Users', error);
        }
    };

    const addNewSession = async (name: string, velocities: number[], rpe: number) => {
        try {
            const users = await DataStore.query(User, (c) => c.username.eq(name));
            const post = await DataStore.save(
                new Session({
                    user: users[0],
                    rpe: rpe,
                    velocities: velocities,
                    date: new Date().toISOString(),
                })
            );

            console.log('User saved successfully!', post);
        } catch (error) {
            console.log('Error adding session', error);
        }
    }

    const retrieveData = async (name: string) => {
        try {
            const users = await DataStore.query(User, (c) => c.username.eq(name));
            console.log('Users retrieved successfully!');
            return users[0];
        } catch (error) {
            console.log('Error retrieving Users', error);
        }
    }

    const retrieveSessionData = async (name: string) => {
        try {
            const user = await retrieveData(name);
            if (user) {
                const sessions = await DataStore.query(Session, (c) => c.userSessionsId.eq(user.id));
                console.log('Sessions retrieved successfully!');
                return sessions;
            }
        } catch (error) {
            console.log('Error retrieving Sessions', error);
        }
        return [];
    }

    const deleteSession = async (id: string) => {
        try {
            await DataStore.delete(Session, (c) => c.id.eq(id));
            console.log('Session deleted successfully!');
        } catch (error) {
            console.log('Error deleting Session', error);
        }
    }

    const clearData = async () => {
        try {
            await DataStore.clear();
            console.log('Local storage cleared successfully!');
        } catch (error) {
            console.log('Error clearing data', error);
        }
    }

    return {
        createUser,
        calibrateRPE,
        addNewSession,
        retrieveData,
        deleteSession,
        clearData,
        retrieveSessionData
    }
}

export default localStorage;