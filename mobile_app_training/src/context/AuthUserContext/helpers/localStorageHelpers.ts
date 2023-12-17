import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE_TOKEN_NAME, LOCAL_STORAGE_USER_AUTH_NAME } from "@src/config/constants";

export const saveUserDataLocalStorage = async ({ user }: ISaveUserAuthLocalStorageProps): Promise<void> => {
  const userAuthLocalStorage: IUserAuthLocalStorageData = {
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url,
    avatar_filename: user.avatar_filename
  };

  await AsyncStorage.setItem(LOCAL_STORAGE_USER_AUTH_NAME, JSON.stringify(userAuthLocalStorage));
  await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, user.token);
};

export const clearUserDataLocalStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem(LOCAL_STORAGE_USER_AUTH_NAME);
  await AsyncStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
};

export const getTokenUserLocalStorage = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
};

export const getUserAuthLocalStorage = async (): Promise<IUserAuthLocalStorageData | null> => {
  const userAuth = await AsyncStorage.getItem(LOCAL_STORAGE_USER_AUTH_NAME);

  if(userAuth) {
    return JSON.parse(userAuth);
  } else {
    return null;
  }
};
