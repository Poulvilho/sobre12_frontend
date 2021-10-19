import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import sobre12Api from '../services/api';
import { RootTabScreenProps } from '../types';
import { user } from './api';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [item, setItem] = useState<user>({email: '', password: ''});

  useEffect(() => {
    sobre12Api.post<user>("/users/login")
    .then(response  => {
      console.log(response);
      return setItem(response.data);
    })
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leitura do backend</Text>
      <Text>Email: {item.email}</Text>
      <Text>Senha: {item.password}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
