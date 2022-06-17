import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/core';

import { useContract } from '../../contexts/contract';

import CustomButton from '../../components/CustomButton';
import FloatCreateButton from '../../components/FloatCreateButton';
import { View } from '../../components/Themed';

import { IBudget } from '../BudgetForm/api';

import { GetBudgets } from './api';
import { styles } from './styles';

export default function Budget() {
  const { contract } = useContract();

  const [budget, setBudget] = useState<Array<IBudget>>();

  const LoadBudgets = (async () => {
    await GetBudgets(contract.id).then((response) => {
      setBudget(response.data);
    });
  })

  useEffect(() => {
    LoadBudgets();
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      <FlatList
        data={budget}
        renderItem={({item}) => (
          <CustomButton
            key={item.id}
            title={item.description}
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: IBudget) => id }
      />
      <FloatCreateButton title='Adicionar orçamento' form='BudgetForm' />
    </View>
  );
}
