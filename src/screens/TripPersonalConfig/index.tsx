import React from 'react';
import CustomButton from '../../components/CustomButton';

import { Text, View } from '../../components/Themed';

import { styles } from './styles';

export default function TripPersonalConfig() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações Pessoais</Text>
      <CustomButton
        title={'Relatórios'}
        onPress={() => {}}
      />
      <CustomButton
        title={'Dívidas'}
        onPress={() => {}}
      />
    </View>
  );
}
