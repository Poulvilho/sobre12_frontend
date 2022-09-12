import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/core';

import { useContract } from '../../contexts/contract';

import FloatCreateButton from '../../components/FloatCreateButton';
import { View } from '../../components/Themed';

import { IBudget } from '../BudgetForm/api';

import { GetBudgets } from './api';
import { styles } from './styles';
import BudgetComponent from '../../components/BudgetComponent';

export default function Budget() {
  const { contract } = useContract();

  const [budget, setBudget] = useState<Array<IBudget>>();

  const LoadBudgets = (async () => {
    await GetBudgets(contract!.id).then((response) => {
      setBudget(response.data);
    });
  });

  useEffect(() => {
    LoadBudgets();
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={budget}
        renderItem={({item}) => (
          <BudgetComponent
            key={item.id}
            budget={item}
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: IBudget) => id }
      />
      {contract!.role === 0 && (
        <FloatCreateButton title='Adicionar orçamento' form='BudgetForm' />
      )}
    </View>
  );
}
