import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE_TOKEN_NAME } from "@src/config/constants";

export const saveUserDataLocalStorage = async ({ user }: ISaveUserAuthLocalStorageProps): Promise<void> => {
  console.log("save local storage", JSON.stringify(user));

  await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, user.token);
};

export const clearUserDataLocalStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
};

export const getTokenUserLocalStorage = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
};
