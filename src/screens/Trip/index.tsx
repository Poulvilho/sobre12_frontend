import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import CostItem from '../../components/CostItem';
// import CustomButton from '../../components/CustomButton';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { ICost } from '../CostForm/api';
import { GetBudgets } from '../Budget/api';
import { IBudget } from '../BudgetForm/api';

import { GetCosts } from './api';
import { styles } from './styles';
import BudgetComponent from '../../components/BudgetComponent';

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

    // const CostMock = [
    //   {
    //     description: 'Almoço de domingo',
    //     value: 200,
    //     category: '1',
    //     dtCost: new Date(),
    //     trip: 'string',
    //     user: 'string',
    //     participants: ['1'],
    //     id: '1',
    //   },
    //   {
    //     description: 'Gasosa da semana',
    //     value: 500,
    //     category: '5',
    //     dtCost: new Date(),
    //     trip: '1',
    //     user: '1',
    //     participants: ['1'],
    //     id: '2',
    //   },
    // ];
    // setCost(CostMock);
  })

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
      <Text>Custos</Text>
      <FlatList
        style={styles.list}
        data={cost}
        renderItem={({item}) => (
          <CostItem
            key={item.id}
            cost={item}
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: ICost) => id }
      />
      <FloatCreateButton title='Adicionar custo' form='CostForm' />
    </View>
  );
}
