import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ContractProvider from './src/contexts/contract';
import UserProvider from './src/contexts/user';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserProvider>
          <ContractProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ContractProvider>
        </UserProvider>
      </SafeAreaProvider>
    );
  }
}
