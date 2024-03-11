import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Loading: undefined;
  Login: undefined;
  Logout: undefined;
}

createStackNavigator<RootStackParamList>();
