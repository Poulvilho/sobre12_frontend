import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import CostItem from '../../components/CostItem';
// import CustomButton from '../../components/CustomButton';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import FloatCreateButton from '../../components/FloatCreateButton';
import BudgetComponent from '../../components/BudgetComponent';
import TopTabComponent from '../../components/TopTabComponent';
import { Text, View } from '../../components/Themed';

import { ICost } from '../CostForm/api';
import { GetBudgets } from '../Budget/api';
import { IBudget } from '../BudgetForm/api';

import { GetCosts } from './api';
import { styles } from './styles';


export default function Trip() {
  const { contract } = useContract();
  const { user } = useUser();

  const [initDate, setInitDate] = useState<Date>(new Date());
  const [untilDate, setUntilDate] = useState<Date>(new Date(contract!.dtend));
  
  const [cost, setCost] = useState<Array<ICost>>([]);
  const [filteredCost, setFilteredCost] = useState<Array<ICost>>();
  const [budget, setBudget] = useState<Array<IBudget>>([]);
  const [filteredBudget, setFilteredBudget] = 
  useState<Array<IBudget>>();
  const [showBudget, setshowBudget] = useState(true);

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
  // setCost(CostMock);
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

  const LoadBudgets = (async () => {
    await GetCosts(contract!.id, user!.id).then((response) => {
      response.data.sort((a,b)=>{
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
      setCost(response.data);
      setFilteredCost(cost)
    });
    await GetBudgets(contract!.id).then((response) => {
      response.data.sort((a,b)=>{
        let dateA = new Date(a.dtbudget);
        let dateB = new Date(b.dtbudget);
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
      setBudget(response.data);
      setFilteredBudget(response.data)
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
    // budget?.sort((a,b)=>{
    //   let dateA = new Date(a.dtbudget);
    //   let dateB = new Date(b.dtbudget);
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
    // setFilteredBudget(budget);
  });

  function showBudgetList(){
    if(!showBudget)
      setshowBudget(true);
  }
  
  function showCostList(){
    if(showBudget){
      setshowBudget(false);
    }
  }

  const getBudgetCosts = (category: string) =>{
    let value = 0;
    cost?.forEach((costItem)=>{
      if(costItem.category === category){
        value+=costItem.value
      }
    })
    return value;
  }

  const getBudgetValues = (category: string) =>{
    let value = 0;
    budget?.forEach((budgetItem)=>{
      if(budgetItem.category === category){
        value+=budgetItem.value
      }
    })
    return value;
  }
  
  useEffect(() => {
    LoadBudgets();
  }, [useIsFocused()]);

  useEffect(() => {
    const formatedInitDate = new Date(
      initDate.getFullYear(),initDate.getMonth(),initDate.getDate(),0,0,0,
    );
    const formatedUntilDate = new Date(
      untilDate.getFullYear(),untilDate.getMonth(),untilDate.getDate(),23,59,59,
    );
    setFilteredCost(cost?.filter((cost)=>{
      let costDate = new Date(cost.dtcost)
      return costDate >= formatedInitDate && 
             costDate <= formatedUntilDate
    }));
    setFilteredBudget(budget?.filter((budget)=>{
      let budgetDate = new Date(budget.dtbudget)
      return budgetDate >= formatedInitDate &&
             budgetDate <= formatedUntilDate
    }));

  }, [initDate,untilDate,budget]);

  return (
    <View style={styles.container}>
      <TopTabComponent
        firstOption='Orçamentos'
        firstFunction={showBudgetList}
        secondOption='Custos'
        secondFunction={showCostList}
      />
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
      { showBudget && filteredBudget &&
        <FlatList
          style={styles.list}
          data={filteredBudget}
          renderItem={({item}) => (
            <BudgetComponent
              key={item.id}
              budget={item}
              spent={item.category
                ? getBudgetCosts(item.category)
                : 0}
              onPress={() => {}}
            />
          )}
          keyExtractor={({id}: IBudget) => id }
        />
      }
      { !showBudget &&
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
      }
      { showBudget && 
        <FloatCreateButton title='Adicionar orçamento' form='BudgetForm' />
      }
      { !showBudget && 
        <FloatCreateButton title='Adicionar custo' form='CostForm' />
      }
    </View>
  );
}
