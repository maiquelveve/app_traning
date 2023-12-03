import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserDataLocalStorage = async ({ user }: ISaveUserAuthLocalStorageProps): Promise<void> => {
  console.log("save local storage", user);
  await AsyncStorage.setItem("token_user", user.token);
};

export const getTokenUserLocalStorage = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token_user");
};