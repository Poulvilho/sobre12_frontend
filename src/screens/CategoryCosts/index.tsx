import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import CostItem from '../../components/CostItem';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { ICost } from '../CostForm/api';

import { GetCosts } from './api';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryCosts'>;

export default function CategoryCosts({route}: Props) {
  const { contract } = useContract();
  const { user } = useUser();

  const { category, startDate, endDate } = route.params;

  const [initDate, setInitDate] = useState<Date>(new Date(startDate));
  const [untilDate, setUntilDate] = useState<Date>(new Date(endDate));
  
  const [cost, setCost] = useState<Array<ICost>>(null!);
  const [filteredCost, setFilteredCost] = useState<Array<ICost>>();

  const LoadCosts = (async () => {
    await GetCosts(contract!.id, user!.id).then((response) => {
      setCost(response.data.filter((cost: ICost)=>
        cost.category.toString() === category?.value,
      ));
    });

    cost?.sort((a,b)=>{
      let dateA = new Date(a.dtcost);
      let dateB = new Date(b.dtcost);
      if(dateA > dateB){
        return -1;
      }
      else if(dateA < dateB){
        return 1;
      }
      else{
        return 0
      }
    })

    setFilteredCost(cost)
  })
  
  useEffect(() => {
    LoadCosts();
  }, [useIsFocused()]);

  useEffect(() => {
    setFilteredCost(cost?.filter((cost)=>{  
      return new Date(cost.dtcost).toISOString() >= initDate.toISOString() && 
      new Date(cost.dtcost).toISOString() <= untilDate.toISOString()
    }));

  }, [initDate, untilDate, cost]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custos com {category?.label}</Text>
      <View style={styles.datePicker}>
        <Text style={styles.picker}>De:</Text>
        <CustomDateTimePicker
          date={initDate}
          setDate={setInitDate}
          mode={'date'}
          width='30%'
          maximumDate={untilDate}
        />
        <Text style={styles.picker}> à </Text>
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
      <FloatCreateButton title='Adicionar custo' form='CostForm' />
    </View>
  );
}
