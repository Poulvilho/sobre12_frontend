import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useUser } from '../../contexts/user';

import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';
import { useContract } from '../../contexts/contract';

import { CreateCost, ICostForm } from './api';
import { styles } from './styles';
import CustomButton from '../../components/CustomButton';

export default function CostForm() {
  const { navigate } = useNavigation();
  const { contract } = useContract();
  const { user } = useUser();

  const handleSubmit = (async (values: ICostForm) => {
    await CreateCost(values).then(() => {
      navigate('TripNavigator');
    });
  });

  const costFormik = useFormik<ICostForm>({
    initialValues: {
      description: '',
      value: 0.0,
      dtcost: new Date(),
      trip: contract.id,
      user: user.id,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Insira um nome!'),
      value: Yup.number().required('Insira um valor!'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar custo</Text>
      <CustomTextInput
        title='Descrição'
        fieldName='description'
        formikHelpers={costFormik}
        width='80%'
        mode='outlined'
      />
      <CustomTextInput
        title='Valor'
        fieldName='value'
        formikHelpers={costFormik}
        width='80%'
        mode='outlined'
        keyboardType='numeric'
      />
      <CustomDateTimePicker
        date={costFormik.values.dtcost}
        setDate={(newDate) => costFormik.setFieldValue('dtcost', newDate)}
        mode={'date'}
        error={Boolean(costFormik.errors.dtcost)}
        width='80%'
      />
      <CustomButton
        title='Salvar'
        onPress={costFormik.submitForm}
      />
    </View>
  );
}
