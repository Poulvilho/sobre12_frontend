import React, { useEffect, useState } from 'react';

import { authResult } from '../../hooks/auth';
import { contract } from '../../hooks/contract';

import CustomDateTimePicker from '../../components/CustomDatePicker';
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { Cost, GetCosts } from './api';

import { styles } from './styles';

export default function Trip() {
  const [date, setDate] = useState<Date>(new Date());
  const [budget, setBudget] = useState<Array<Cost>>();

  const LoadCosts = (async () => {
    const response = await GetCosts(contract.id, authResult.id);
    setBudget(response.data);
  })

  useEffect(() => {
    try {
      LoadCosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      <FloatCreateButton title='Adicionar custo' form='Home' />
    </View>
  );
}
