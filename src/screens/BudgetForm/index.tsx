import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import React from 'react';
import { Button } from 'react-native';
import * as Yup from 'yup';

import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';
import { useContract } from '../../contexts/contract';
import { CreateBudget, IBudgetForm } from './api';

import { styles } from './styles';

export default function TripForm() {
  const { navigate } = useNavigation();
  const { contract } = useContract();
  const handleSubmit = (async (values: IBudgetForm) => {
    await CreateBudget(values).then(() => {
      navigate('Budget');
    });
  });

  const tripFormik = useFormik<IBudgetForm>({
    initialValues: {
      name: '',
      value: 0.0,
      dtbudget: new Date(),
      trip: contract.id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Insira um nome!'),
      value: Yup.number().required('Insira um valor!'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua viagem</Text>
      <CustomTextInput
        title='Nome'
        fieldName='name'
        formikHelpers={tripFormik}
        width='80%'
        mode='outlined'
      />
      <CustomTextInput
        title='Valor'
        fieldName='value'
        formikHelpers={tripFormik}
        width='80%'
        mode='outlined'
      />
      <CustomDateTimePicker
        date={tripFormik.values.dtbudget}
        setDate={(newDate) => tripFormik.setFieldValue('dtbudget', newDate)}
        mode={'date'}
        error={Boolean(tripFormik.errors.dtbudget)}
        width='80%'
      />
      <Button
        title='Salvar'
        onPress={tripFormik.submitForm}
      />
    </View>
  );
}
