import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainRoutesParamList } from "../routes/stack/MainRoutes";

export type AppStackRoutes<RouteName extends keyof MainRoutesParamList> =
  NativeStackScreenProps<MainRoutesParamList, RouteName>;
