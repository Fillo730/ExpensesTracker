import * as SecureStore from 'expo-secure-store'

export const saveItem = async <T>(key: string, data: T) => {
    await  SecureStore.setItemAsync(key, JSON.stringify(data));
};
export const clearItem = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
};
export const checkIfExists = async <T>(key: string): Promise<T | null> => {
    const item = await SecureStore.getItemAsync(key);
    return item === null ? null : JSON.parse(item) as T;
};   