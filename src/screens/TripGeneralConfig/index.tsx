import React from 'react';
import CustomButton from '../../components/CustomButton';

import { Text, View } from '../../components/Themed';
import { useContract } from '../../contexts/contract';

import { styles } from './styles';

export default function TripGeneralConfig() {

  const { contract } = useContract();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{contract.name}</Text>
      <CustomButton
        title={'Orçamentos'}
        onPress={() => {}}
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
