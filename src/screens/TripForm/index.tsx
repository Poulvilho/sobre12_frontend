import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Button } from 'react-native';

import { Text, View } from '../../components/Themed';

import { styles } from './styles';

export default function TripForm() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua viagem</Text>
      <Button
        title='Salvar'
        onPress={() => navigate('TripNavigator')}
      />
    </View>
  );
}
