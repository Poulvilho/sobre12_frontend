import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Button } from 'react-native';

import { Text, View } from '../../components/Themed';

import { styles } from './styles';

export default function Login() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, </Text>
      <Button
        title='usuário'
        onPress={() => navigate('Profile')}
      />
      <Button
        title='Sair'
        onPress={() => navigate('Login')}
      />
      <Text style={styles.title}>Lista de viagens</Text>
      <Button
        title='Viagem'
        onPress={() => navigate('Trip')}
      />
    </View>
  );
}
