/**
 * If you are not familiar with React Navigation,
 * refer to the "Fundamentals" guide: 
 * https://reactnavigation.org/docs/getting-started
 */
import { FontAwesome,Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';

import useColorScheme from '../hooks/useColorScheme';

import NotFoundScreen from '../screens/NotFoundScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Trip from '../screens/Trip';
import TripPersonalConfig from '../screens/TripPersonalConfig';
import TripGeneralConfig from '../screens/TripGeneralConfig';
import TripForm from '../screens/TripForm';
import Budget from '../screens/Budget';
import BudgetForm from '../screens/BudgetForm';
import CostForm from '../screens/CostForm';
import Subcategory from '../screens/Subcategory';

import {
  RootStackParamList,
  TripTabParamList,
} from './types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation(
  { colorScheme }: { colorScheme: ColorSchemeName },
) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on
 * top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#42A4E8' },
        headerTintColor: '#353535',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Login" component={Login}
        options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register}
        options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={Profile}
        options={{ title: 'Perfil' }} />
      <Stack.Screen name="Home" component={Home}
        options={{ headerShown: false }} />
      <Stack.Screen name="TripNavigator" component={TripTabNavigator}
        options={{ title: 'Viagem' }} />
      <Stack.Screen name="TripForm" component={TripForm}
        options={{ title: 'Nova viagem' }} />
      <Stack.Screen name="Budget" component={Budget}
        options={{ title: 'Or??amento' }} />
      <Stack.Screen name="BudgetForm" component={BudgetForm}
        options={{ title: 'Novo or??amento' }} />
      <Stack.Screen name="CostForm" component={CostForm}
        options={{ title: 'Novo custo' }} />
      <Stack.Screen name="Subcategory" component={Subcategory}
        options={{ title: 'Subcategorias' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen}
        options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of
 * the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<TripTabParamList>();

function TripTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Trip"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Despesas"
        component={Trip}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Dados pessoais"
        component={TripPersonalConfig}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Configura????es da viagem"
        component={TripGeneralConfig}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="plane" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the
 * web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
