import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import React from 'react';
import { Button } from 'react-native';
import * as Yup from 'yup';

import { useUser } from '../../contexts/user';

import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';

import { CreateTrip, ITripForm } from './api';
import { styles } from './styles';

export default function TripForm() {
  const { navigate } = useNavigation();
  const { user } = useUser()

  const handleSubmit = (async (values: ITripForm) => {
    await CreateTrip(values).then(() => {
      navigate('Home');
    });
  });

  const tripFormik = useFormik<ITripForm>({
    initialValues: {
      name: '',
      description: '',
      dtstart: new Date(),
      dtend: new Date(),
      user: user.id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Insira um nome!'),
      description: Yup.string().required('Insira uma descrição!'),
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
        title='Descrição'
        fieldName='description'
        formikHelpers={tripFormik}
        width='80%'
        mode='outlined'
      />
      <View style={styles.row}>
        <CustomDateTimePicker
          date={tripFormik.values.dtstart}
          setDate={(newDate) => tripFormik.setFieldValue('dtstart', newDate)}
          mode={'date'}
          error={Boolean(tripFormik.errors.dtstart)}
          width='40%'
        />
        <CustomDateTimePicker
          date={tripFormik.values.dtend}
          setDate={(newDate) => tripFormik.setFieldValue('dtend', newDate)}
          mode={'date'}
          error={Boolean(tripFormik.errors.dtend)}
          width='40%'
        />
      </View>
      <Button
        title='Salvar'
        onPress={tripFormik.submitForm}
      />
    </View>
  );
}
