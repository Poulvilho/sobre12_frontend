/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',
      Profile: 'profile',
      TripForm: 'tripForm',
      TripNavigator: {
        screens: {
          Trip: 'trip',
          TripPersonalConfig: 'tripPersonalConfig',
          TripGeneralConfig: 'tripGeneralConfig',
        },
      },
      Home: 'home',
      NotFound: '*',
      Budget: 'budget',
      BudgetForm: 'budgetForm',
      CostForm: 'costForm',
      Subcategory: 'subcategory',
    },
  },
};

export default linking;
