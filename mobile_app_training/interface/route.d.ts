import { NavigationProp } from "@react-navigation/native";

declare global {
  type EnumRoutesSystem = "init" | "init_auth" | "trainers";
}

type RootStackParamList = {
  init: undefined;
  init_auth: undefined;
  trainers: undefined;
};

type TRoutesStacks = NavigationProp<RootStackParamList>
