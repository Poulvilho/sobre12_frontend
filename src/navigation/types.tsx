/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Home: undefined;
  Trip: NavigatorScreenParams<TripTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type TripTabParamList = {
  Trip: undefined;
  TripPersonalConfig: undefined;
  TripGeneralConfig: undefined;
};

export type RootTabScreenProps<Screen extends keyof TripTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TripTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
