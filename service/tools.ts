import AsyncStorage from "@react-native-async-storage/async-storage";
import {Utilisateur} from "../entities/Utilisateur";

export async function saveInLocalStorage(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
}

export async function getInLocalStorage(key: string): Promise<string | null> {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? jsonValue : null;
}
