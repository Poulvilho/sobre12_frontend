import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import CustomButton from '../../components/CustomButton';

import { useContract } from '../../contexts/contract';

import FloatCreateButton from '../../components/FloatCreateButton';
import { View } from '../../components/Themed';

import { IBudget } from '../BudgetForm/api';

import { GetBudgets } from './api';
import { styles } from './styles';

export default function Trip() {
  const { contract } = useContract();

  const [budget, setBudget] = useState<Array<IBudget>>();

  const LoadBudgets = (async () => {
    const response = await GetBudgets(contract.id);
    setBudget(response.data);
  })

  useEffect(() => {
    try {
      LoadBudgets();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={budget}
        renderItem={({item}) => (
          <CustomButton
            key={item.id}
            title={item.name}
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: IBudget) => id }
      />
      <FloatCreateButton title='Adicionar orçamento' form='BudgetForm' />
    </View>
  );
}
