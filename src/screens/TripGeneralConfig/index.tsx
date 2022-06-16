import React from 'react';
import { useNavigation } from '@react-navigation/core';

import CustomButton from '../../components/CustomButton';
import { Text, View } from '../../components/Themed';
import { useContract } from '../../contexts/contract';

import { styles } from './styles';

export default function TripGeneralConfig() {
  const { navigate } = useNavigation();
  const { contract } = useContract();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{contract.name}</Text>
      <CustomButton
        title={'Orçamentos'}
        onPress={() => {navigate('Budget')}}
      />
      <CustomButton
        title={'Relatórios Gerais'}
        onPress={() => {}}
      />
      <CustomButton
        title={'Gerenciar categorias'}
        onPress={() => {}}
      />
    </View>
  );
}
