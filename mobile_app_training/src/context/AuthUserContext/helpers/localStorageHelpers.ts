import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
  LOCAL_STORAGE_TOKEN_NAME, 
  LOCAL_STORAGE_USER_AUTH_NAME, 
  LOCAL_STORAGE_USER_PROFILES_NAME 
} from "@src/config/constants";

import { destructureUserToLocalStorage } from "./userAuthHelpers";

export const saveUserDataLocalStorage = async ({ user }: ISaveUserAuthLocalStorageProps): Promise<void> => {
  const { userAuthLocalStorage, profilesLocalStorage } = destructureUserToLocalStorage(user);

  await AsyncStorage.setItem(LOCAL_STORAGE_USER_PROFILES_NAME, JSON.stringify(profilesLocalStorage));
  await AsyncStorage.setItem(LOCAL_STORAGE_USER_AUTH_NAME, JSON.stringify(userAuthLocalStorage));
  await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, user.token);
};

export const clearUserDataLocalStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem(LOCAL_STORAGE_USER_PROFILES_NAME);
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

export const getUserProfilesLocalStorage = async (): Promise<IProfilesLocalStorageData | null> => {
  const userProfiles = await AsyncStorage.getItem(LOCAL_STORAGE_USER_PROFILES_NAME);

  if(userProfiles) {
    return JSON.parse(userProfiles);
  } else {
    return null;
  }
};
