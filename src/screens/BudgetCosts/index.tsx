import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

import { useContract } from '../../contexts/contract';

import CostItem from '../../components/CostItem';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { ICost } from '../CostForm/api';
import { GetCosts } from '../Trip/api';

import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'BudgetCosts'>;

export default function Trip({route}: Props) {
  const { contract } = useContract();

  const { budget } = route.params;

  const [initDate, setInitDate] = useState<Date>(new Date());
  const [untilDate, setUntilDate] = useState<Date>(new Date());
  
  const [cost, setCost] = useState<Array<ICost>>(null!);
  const [filteredCost, setFilteredCost] = useState<Array<ICost>>();

  const LoadCosts = (async () => {
    await GetCosts(contract!.id, contract!.guest).then((response) => {
      let filteredCostsAPI = response.data.filter((cost) => {
        return cost.category === budget.category
      });

      setCost(filteredCostsAPI.sort((a,b)=>{
        let dateA = new Date(a.dtcost);
        let dateB = new Date(b.dtcost);
        if (dateA > dateB)
          return -1;
        else if (dateA < dateB)
          return 1;
        else
          return 0;
      }));
    });

    setFilteredCost(cost)
  });
  
  useEffect(() => {
    LoadCosts();
  }, [useIsFocused()]);

  useEffect(() => {
    const formatedInitDate = new Date(
      initDate.getFullYear(), initDate.getMonth(), initDate.getDate(),
      0, 0, 0, 0,
    );
    const formatedUntilDate = new Date(
      untilDate.getFullYear(), untilDate.getMonth(), untilDate.getDate(),
      23, 59, 59, 999,
    );

    setFilteredCost(cost?.filter((cost) => {
      let dateCost = new Date(cost.dtcost);
      return dateCost >= formatedInitDate && dateCost <= formatedUntilDate;
    }));
  }, [initDate, untilDate, cost]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custos com {budget.description}</Text>
      <View style={styles.datePicker}>
        <Text style={styles.title}>De:</Text>
        <CustomDateTimePicker
          date={initDate}
          setDate={setInitDate}
          mode={'date'}
          width='30%'
          maximumDate={untilDate}
        />
        <Text style={styles.title}> à </Text>
        <CustomDateTimePicker
          date={untilDate}
          setDate={setUntilDate}
          mode={'date'}
          width='30%'
        />
      </View>
      <FlatList
        style={styles.list}
        data={filteredCost}
        renderItem={({item}) => (
          <CostItem
            key={item.id}
            cost={item}
          />
        )}
        keyExtractor={({id}: ICost) => id }
      />
      {contract!.role < 2 &&
        <FloatCreateButton title='Adicionar custo' form='CostForm' />
      }
    </View>
  );
}
