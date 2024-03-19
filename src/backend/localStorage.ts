import { DataStore } from 'aws-amplify/datastore';
import { LazyUser, Session, User } from "../models";
import { useUserContext } from '../Contexts';

interface LocalStorageApi {
    createUser(name: string): void;
    calibrateRPE(name: string, rpe10: number, rpe0: number): void;
    retrieveData(name: string): Promise<LazyUser | undefined>;
    addNewSession(name: string, velocities: number[], rpe: number): void;
    retrieveSessionData(name: string): Promise<Session[]>;
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
            console.log(JSON.stringify(users, null, 2));
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
                console.log(JSON.stringify(sessions, null, 2));
                return sessions;
            }
        } catch (error) {
            console.log('Error retrieving Sessions', error);
        }
        return [];
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
        createUser,
        calibrateRPE,
        addNewSession,
        retrieveData,
        clearData,
        retrieveSessionData
    }
}

export default localStorage;