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

import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { GetCosts } from '../Trip/api';


type Props = NativeStackScreenProps<RootStackParamList, 'BudgetCosts'>;

export default function Trip({route}: Props) {
  const { contract } = useContract();
  const { user } = useUser();

  const {budget} = route.params || {};

  const [initDate, setInitDate] = useState<Date>(new Date());
  const [untilDate, setUntilDate] = useState<Date>(new Date());
  
  const [cost, setCost] = useState<Array<ICost>>(null!);
  const [filteredCost, setFilteredCost] = useState<Array<ICost>>();

  const LoadCosts = (async () => {
    await GetCosts(contract!.id, user!.id).then((response) => {
      let filteredCostsAPI = response.data.filter((cost)=>{
        return cost.category === budget.category
      })
      setCost(filteredCostsAPI.sort((a,b)=>{
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
      }));
    });

    // const CostMock = [
    //   {
    //     description: 'Almoço de domingo',
    //     value: 200,
    //     category: '1',
    //     dtcost: new Date(),
    //     trip: 'string',
    //     user: 'string',
    //     participants: ['1'],
    //     id: '1',
    //   },
    //   {
    //     description: 'Gasosa da semana',
    //     value: 500,
    //     category: '5',
    //     dtcost: new Date(),
    //     trip: '1',
    //     user: '1',
    //     participants: ['1'],
    //     id: '2',
    //   },
    // ];
    // setCost(CostMock.filter((cost)=>{
    //   return cost.category === budget.category
    // }))

    // cost?.sort((a,b)=>{
    //   let dateA = new Date(a.dtcost);
    //   let dateB = new Date(b.dtcost);
    //   if(dateA > dateB){
    //     return -1;
    //   }
    //   else if(dateA < dateB){
    //     return 1;
    //   }
    //   else{
    //     return 0
    //   }
    // })

    setFilteredCost(cost)
  })

  // function getBudgetCosts(category:string){
  //   let value = 0;
  //   for(let costItem of cost){
  //     if(costItem.category === category){
  //       value+=costItem.value
  //     }
  //   }
  //   return value;
  // }
  
  useEffect(() => {
    LoadCosts();
  }, [useIsFocused()]);

  useEffect(() => {
    const formatedInitDate = new Date(
      initDate.getFullYear(),initDate.getMonth(),initDate.getDate(),0,0,0,
    );
    const formatedUntilDate = new Date(
      untilDate.getFullYear(),untilDate.getMonth(),untilDate.getDate(),23,59,59,
    );

    setFilteredCost(cost?.filter((cost)=>{
      let dateCost= new Date(cost.dtcost);
      return dateCost >= formatedInitDate && 
             dateCost <= formatedUntilDate
    }));

  }, [initDate,untilDate,cost]);


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
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: ICost) => id }
      />
      <FloatCreateButton title='Adicionar custo' form='CostForm' />
    </View>
  );
}
