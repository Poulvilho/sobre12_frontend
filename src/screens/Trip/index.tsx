import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import CostItem from '../../components/CostItem';
// import CustomButton from '../../components/CustomButton';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import FloatCreateButton from '../../components/FloatCreateButton';
import TopTabComponent from '../../components/TopTabComponent';
import { Text, View } from '../../components/Themed';

import { ICost } from '../CostForm/api';
import { GetBudgets } from '../Budget/api';
import { IBudget } from '../BudgetForm/api';

import { GetCosts } from './api';
import { styles } from './styles';
import { categories } from '../../constants/Categories';
import BudgetCategoryComponent from '../../components/BudgetCategoryComponent';
import { ILOV } from '../../components/CustomDropdown';
import BudgetItem from '../../components/BudgetItem';


export default function Trip() {
  const { contract } = useContract();
  const { user } = useUser();

  const [initDate, setInitDate] = useState<Date>(new Date(contract!.dtstart));
  const [untilDate, setUntilDate] = useState<Date>(new Date(contract!.dtend));
  
  const [cost, setCost] = useState<Array<ICost>>([]);
  const [filteredCost, setFilteredCost] = useState<Array<ICost>>();
  const [budget, setBudget] = useState<Array<IBudget>>([]);
  const [filteredBudget, setFilteredBudget] = 
  useState<Array<IBudget>>([]);
  const [showTab, setshowTab] = useState(0);
  const [budgetedCategories, setBudgetedCategories] = useState<ILOV[]>([]);

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
      setFilteredBudget(response.data);
    });
  });

  const getBudgetCosts = (category: string) =>{
    let value = 0;
    filteredCost?.forEach((costItem)=>{
      if(costItem.category === category){
        value+=costItem.value
      }
    })
    return value;
  }

  const getBudgetValue = (category: string) =>{
    let value = 0;
    filteredBudget?.forEach((budgetItem)=>{
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
    if(filteredBudget.length > 0){
      let budgetedCategoriesValues = 
        filteredBudget!.map((budget)=> {return budget.category});
      budgetedCategoriesValues = budgetedCategoriesValues.filter((a,b)=>{ 
        return budgetedCategoriesValues.indexOf(a) === b})
      setBudgetedCategories(categories.filter((category)=>{ 
        return budgetedCategoriesValues.includes(parseInt(category.value))}))
    }

  }, [initDate,untilDate,budget]);

  return (
    <View style={styles.container}>
      <TopTabComponent
        tabs={[
          {
            title: 'Resumo',
            function: ()=>setshowTab(0),
          },
          {
            title: 'Custos',
            function: ()=>setshowTab(1),
          },
          {
            title: 'Orçamentos',
            function: ()=>setshowTab(2),
          },
        ]}
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
      { showTab == 0 && filteredBudget &&
        <>
          <FlatList
            style={styles.list}
            data={budgetedCategories}
            renderItem={({item}) => (
              <BudgetCategoryComponent
                key={item.value}
                category={item}
                budgeted={getBudgetValue(parseInt(item.value))}
                spent={getBudgetCosts(parseInt(item.value))}
                startDate={initDate}
                endDate={untilDate}
              />
            )}
            keyExtractor={({value}: ILOV) => value }
          />
          <FloatCreateButton title='Adicionar custo' form='CostForm' />
        </>
      }
      { showTab == 1  &&
        <>
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
        </>

      }
      { showTab == 2  &&
        <>
          <FlatList
            style={styles.list}
            data={filteredBudget}
            renderItem={({item}) => (
              <BudgetItem
                key={item.id}
                budget={item}
              />
            )}
            keyExtractor={({id}: IBudget) => id }
          />
          <FloatCreateButton title='Adicionar orçamento' form='BudgetForm' />
        </>
      }
    </View>
  );
}
