import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import CustomButton from '../../components/CustomButton';

import { useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import CustomDateTimePicker from '../../components/CustomDatePicker';
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { ICost } from '../CostForm/api';

import { GetCosts } from './api';
import { styles } from './styles';

export default function Trip() {
  const { contract } = useContract();
  const { user } = useUser();

  const [date, setDate] = useState<Date>(new Date());
  const [cost, setCost] = useState<Array<ICost>>();

  const LoadCosts = (async () => {
    await GetCosts(contract.id, user.id).then((response) => {
      setCost(response.data);
    });
  });

  useEffect(() => {
    LoadCosts();
  }, [useIsFocused()])

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
      <FlatList
        data={cost}
        renderItem={({item}) => (
          <CustomButton
            key={item.id}
            title={item.description}
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: ICost) => id }
      />
      <FloatCreateButton title='Adicionar custo' form='CostForm' />
    </View>
  );
}
