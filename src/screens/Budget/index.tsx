import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

import { useContract } from '../../contexts/contract';

import FloatCreateButton from '../../components/FloatCreateButton';
import { View } from '../../components/Themed';

import { IBudget } from '../BudgetForm/api';

import { GetBudgets } from './api';
import { styles } from './styles';
import BudgetItem from '../../components/BudgetItem';

type BudgetProps = NativeStackScreenProps<RootStackParamList, 'Budget'>;

export default function Budget({ route }: BudgetProps) {
  const { contract } = useContract();
  const params = route.params;

  const [budget, setBudget] = useState<Array<IBudget>>();

  const LoadBudgets = (async () => {
    await GetBudgets(contract!.id).then((response) => {
      if (params)
        setBudget(response.data.filter((budget: IBudget) => {
          return budget.category.toString() === params.category.value
              && new Date(budget.dtbudget) >= params.startDate
              && new Date(budget.dtbudget) <= params.endDate
        }));
      else
        setBudget(response.data);
    });
  });

  useEffect(() => {
    LoadBudgets();
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      {params && (
        <Text style={styles.title}>Orçamentos de {params.category.label}</Text>
      )}
      <FlatList
        style={styles.list}
        data={budget}
        renderItem={({item}) => (
          <BudgetItem key={item.id} budget={item} />
        )}
        keyExtractor={({id}: IBudget) => id }
      />
      {contract!.role === 0 && (
        <FloatCreateButton title='Adicionar orçamento' form='BudgetForm' />
      )}
    </View>
  );
}
