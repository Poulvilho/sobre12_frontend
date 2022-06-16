import React, { useState } from 'react';

import CustomDateTimePicker from '../../components/CustomDatePicker';
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { styles } from './styles';

export default function Trip() {

  const [date, setDate] = useState<Date>(new Date());

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
