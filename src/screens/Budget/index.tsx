import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/core';

import { useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import FloatCreateButton from '../../components/FloatCreateButton';
import { View } from '../../components/Themed';

import { IBudget } from '../BudgetForm/api';

import { GetBudgets } from './api';
import { styles } from './styles';
import BudgetItem from '../../components/BudgetItem';

export default function Budget() {
  const { user } = useUser();
  const { contract } = useContract();

  const [budget, setBudget] = useState<Array<IBudget>>();

  const LoadBudgets = (async () => {
    await GetBudgets(contract!.id).then((response) => {
      setBudget(response.data);
    });
    // const budgetMock = [
    //   {
    //     id:'1',
    //     description: 'Alimentação',
    //     value: 500,
    //     category: '1',
    //     dtbudget: new Date(),
    //     trip: '1',
    //   },
    //   {
    //     id:'2',
    //     description: 'Transporte',
    //     value: 700,
    //     category: '5',
    //     dtbudget: new Date(),
    //     trip: '1',
    //   },
    // ];
    // setBudget(budgetMock)
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
          <BudgetItem
            key={item.id}
            budget={item}
          />
        )}
        keyExtractor={({id}: IBudget) => id }
      />
      {user!.id === contract!.user && (
        <FloatCreateButton title='Adicionar orçamento' form='BudgetForm' />
      )}
    </View>
  );
}
