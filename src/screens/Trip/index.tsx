import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import Cost from '../../components/Cost';
import CustomButton from '../../components/CustomButton';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { ICost } from '../CostForm/api';
import { GetBudgets } from '../Budget/api';
import { IBudget } from '../BudgetForm/api';

import { GetCosts } from './api';
import { styles } from './styles';

export default function Trip() {
  const { contract } = useContract();
  const { user } = useUser();

  const [date, setDate] = useState<Date>(new Date());
  
  const [cost, setCost] = useState<Array<ICost>>();
  const [budget, setBudget] = useState<Array<IBudget>>();

  const LoadCosts = (async () => {
    await GetCosts(contract!.id, user!.id).then((response) => {
      setCost(response.data);
    });
  });

  const LoadBudgets = (async () => {
    await GetBudgets(contract!.id).then((response) => {
      setBudget(response.data);
    });
  });

  useEffect(() => {
    LoadBudgets();
    LoadCosts();
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomDateTimePicker
          date={date}
          setDate={setDate}
          mode={'date'}
          width='25%'
        />
        <Text style={styles.title}>100</Text>
        <Text style={styles.title}>1000</Text>
      </View>
      <Text>Orçamentos</Text>
      <FlatList
        data={budget}
        renderItem={({item}) => (
          <CustomButton
            key={item.id}
            title={item.description + ': ' + item.value}
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: IBudget) => id }
      />
      <Text>Custos</Text>
      <FlatList
        style={{ width:'80%'}}
        data={cost}
        renderItem={({item}) => (
          <Cost
            key={item.id}
            id = {item.id}
            description={item.description}
            value = {item.value}
            dtcost = {item.dtcost}
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: ICost) => id }
      />
      <FloatCreateButton title='Adicionar custo' form='CostForm' />
    </View>
  );
}
