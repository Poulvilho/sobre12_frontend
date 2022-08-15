import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { Text, View } from '../../components/Themed';
import { useContract } from '../../contexts/contract';

import { styles } from './styles';
import TripConfigItem from '../../components/TripConfigItem';

export default function TripConfig() {
  const { navigate } = useNavigation();
  const { contract } = useContract();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{contract!.name}</Text>
      <TripConfigItem
        icon={'user-friends'}
        title={'Participantes'}
        onPress={() => { navigate('Guest') }}
      />
      <TripConfigItem
        icon={'list'}
        title={'Orçamentos'}
        onPress={() => { navigate('Budget') }}
      />
      <TripConfigItem
        icon={'chart-line'}
        title={'Relatórios'}
        onPress={() => {}}
      />
      <TripConfigItem
        icon={'people-arrows'}
        title={'Dívidas'}
        onPress={() => { navigate('Debt') }}
      />
      <TripConfigItem
        icon={'shapes'}
        title={'Gerenciar categorias'}
        onPress={() => { navigate('Subcategory') }}
      />
    </View>
  );
}
