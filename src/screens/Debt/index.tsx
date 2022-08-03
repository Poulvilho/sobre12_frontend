import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/core';

import { useUser } from '../../contexts/user';
import { useContract } from '../../contexts/contract';

import CustomButton from '../../components/CustomButton';
import { View } from '../../components/Themed';

import { GetMyDebts, GetMyCredits, IDebt } from './api';
import { styles } from './styles';

export default function Debt() {
  const { user } = useUser();
  const { contract } = useContract();

  const [myDebts, setMyDebts] = useState<Array<IDebt>>();
  const [myCredits, setCredits] = useState<Array<IDebt>>();

  const LoadDebts = (async () => {
    await GetMyDebts(user!.id, contract!.id).then((response) => {
      setMyDebts(response.data);
    });
    await GetMyCredits(user!.id, contract!.id).then((response) => {
      setCredits(response.data);
    });
  });

  useEffect(() => {
    LoadDebts();
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      <Text>Minhas dívidas</Text>
      <FlatList
        data={myDebts}
        renderItem={({item}) => (
          <CustomButton
            key={item.cost}
            title={item.cost}
            onPress={() => {}}
          />
        )}
        keyExtractor={({cost}: IDebt) => cost }
      />
      <Text>Meus créditos</Text>
      <FlatList
        data={myCredits}
        renderItem={({item}) => (
          <CustomButton
            key={item.cost}
            title={item.cost}
            onPress={() => {}}
          />
        )}
        keyExtractor={({cost}: IDebt) => cost }
      />
    </View>
  );
}
