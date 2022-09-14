import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/core';

import { useContract } from '../../contexts/contract';

import DebtItem from '../../components/DebtItem';
import { View } from '../../components/Themed';
import TopTabComponent from '../../components/TopTabComponent';

import { GetMyDebts, GetMyCredits, IDebt } from './api';
import { styles } from './styles';

export default function Debt() {
  const { contract } = useContract();
  const { navigate } = useNavigation()

  const [myDebts, setMyDebts] = useState<Array<IDebt>>();
  const [myCredits, setCredits] = useState<Array<IDebt>>();
  const [showFirst, setshowFirst] = useState(true);

  const LoadDebts = (async () => {
    await GetMyDebts(contract!.guest, contract!.id).then((response) => {
      setMyDebts(response.data);
    });
    await GetMyCredits(contract!.guest, contract!.id).then((response) => {
      setCredits(response.data);
    });
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
        tabs={
          [
            {
              title: 'Minhas dívidas',
              function: showFirstFunction,
            },
            {
              title: 'Meus créditos',
              function: showSecondFunction,
            },
          ]}
      />
      { showFirst &&
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
          />
        )}
        keyExtractor={({cost}: IDebt) => cost }
      />
      }
    </View>
  );
}

