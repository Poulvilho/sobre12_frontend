import React from 'react';
import { useNavigation } from '@react-navigation/core';

import CustomButton from '../../components/CustomButton';
import { Text, View } from '../../components/Themed';
import { useContract } from '../../contexts/contract';

import { styles } from './styles';

export default function TripConfig() {
  const { navigate } = useNavigation();
  const { contract } = useContract();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{contract!.name}</Text>
      <CustomButton
        title={'Participantes'}
        onPress={() => { navigate('Guest') }}
      />
      <CustomButton
        title={'Orçamentos'}
        onPress={() => { navigate('Budget') }}
      />
      <CustomButton
        title={'Relatórios'}
        onPress={() => {}}
      />
      <CustomButton
        title={'Dívidas'}
        onPress={() => {}}
      />
      <CustomButton
        title={'Gerenciar categorias'}
        onPress={() => { navigate('Subcategory') }}
      />
    </View>
  );
}
