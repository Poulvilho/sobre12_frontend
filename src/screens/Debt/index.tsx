import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/core';

import { useUser } from '../../contexts/user';
import { useContract } from '../../contexts/contract';

import { View } from '../../components/Themed';

import { GetMyDebts, GetMyCredits, IDebt } from './api';
import { styles } from './styles';
import DebtItem from '../../components/DebtItem';
import TopTabComponent from '../../components/TopTabComponent';

export default function Debt() {
  const { user } = useUser();
  const { contract } = useContract();
  const { navigate } = useNavigation()

  const [myDebts, setMyDebts] = useState<Array<IDebt>>();
  const [myCredits, setCredits] = useState<Array<IDebt>>();
  const [showFirst, setshowFirst] = useState(true);

  const LoadDebts = (async () => {
    await GetMyDebts(user!.id, contract!.id).then((response) => {
      setMyDebts(response.data);
    });
    await GetMyCredits(user!.id, contract!.id).then((response) => {
      setCredits(response.data);
    });
    // const debtMock = [
    //   {
    //     cost: 'Almoço bom',
    //     value: 50,
    //     settled: false,
    //   },
    //   {
    //     cost: 'Gasosa da semana',
    //     value: 100,
    //     settled: true,
    //   },
    // ];
    // setMyDebts(debtMock);

    // const creditMock = [
    //   {
    //     cost: 'Batatinha da praia',
    //     value: 25,
    //     settled: false,
    //   },
    //   {
    //     cost: 'compras do mercadão',
    //     value: 200,
    //     settled: true,
    //   },
    // ];
    // setCredits(creditMock);
  });

  function showFirstFunction(){
    if(!showFirst)
      setshowFirst(true);
  }

  function showSecondFunction(){
    if(showFirst){
      setshowFirst(false);
    }
  }

  useEffect(() => {
    LoadDebts();
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      <TopTabComponent
        firstOption='Minhas dívidas'
        firstFunction={showFirstFunction}
        secondOption='Meus créditos'
        secondFunction={showSecondFunction}
      />
      {
        showFirst &&
      <FlatList
        data={myDebts}
        renderItem={({item}) => (
          <DebtItem
            key={item.cost}
            debt={item}
            mine={true}
            onPress={() => {}}
          />
        )}
        keyExtractor={({cost}: IDebt) => cost }
      />
      }
      {
        !showFirst &&
      <FlatList
        data={myCredits}
        renderItem={({item}) => (
          <DebtItem
            key={item.cost}
            debt={item}
            mine={false}
            onPress={() => { navigate('TripForm', { trip: contract! }) }}
          />
        )}
        keyExtractor={({cost}: IDebt) => cost }
      />
      }
    </View>
  );
}

