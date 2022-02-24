import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Button } from 'react-native';
import FloatCreateButton from '../../components/FloatCreateButton';

import { Text, View } from '../../components/Themed';

import { styles } from './styles';

export default function Login() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Button
          title='usuário'
          onPress={() => navigate('Profile')}
        />
        <Button
          title='Sair'
          onPress={() => navigate('Login')}
        />
      </View>
      <Text style={{ fontSize: 20 }}>Lista de viagens</Text>
      <Button
        title='Viagem'
        onPress={() => navigate('TripNavigator')}
      />
      <FloatCreateButton title='Criar viagem' form='TripForm' />
    </View>
  );
}
