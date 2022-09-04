/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IBudget } from '../screens/BudgetForm/api';
import { ITripForm } from '../screens/TripForm/api';
 
 declare global {
   // eslint-disable-next-line no-unused-vars
   namespace ReactNavigation {
     // eslint-disable-next-line no-unused-vars
     interface RootParamList extends RootStackParamList {}
   }
 }
 
export type RootStackParamList = {
   Login: undefined;
   Register: undefined;
   Profile: undefined;
   Home: undefined;
   TripForm: {trip: ITripForm} | undefined;
   TripNavigator: NavigatorScreenParams<TripTabParamList> | undefined;
   NotFound: undefined;
   Budget: undefined;
   BudgetCosts: {budget: IBudget};
   BudgetForm: {budget: IBudget} | undefined;
   CostForm: undefined;
   Subcategory: undefined;
   Guest: undefined;
   Debt: undefined;
   Spectator: undefined;
 };
 
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
   NativeStackScreenProps<
     RootStackParamList,
     Screen
   >;
 
export type TripTabParamList = {
   Trip: undefined;
   TripConfig: undefined;
 };
 
export type RootTabScreenProps<Screen extends keyof TripTabParamList> =
   CompositeScreenProps<
     BottomTabScreenProps<TripTabParamList, Screen>,
     NativeStackScreenProps<RootStackParamList>
   >;
