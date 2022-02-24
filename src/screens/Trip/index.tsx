import React from 'react';
import FloatCreateButton from '../../components/FloatCreateButton';

import { Text, View } from '../../components/Themed';

import { styles } from './styles';

export default function Trip() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orçamento x Custo</Text>
      <FloatCreateButton title='Adicionar custo' form='Home' />
    </View>
  );
}
