import React from 'react';

import { Text, View } from '../../components/Themed';

import { styles } from './styles';

export default function TripGeneralConfig() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações Gerais</Text>
    </View>
  );
}
