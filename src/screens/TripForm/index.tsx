import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useUser } from '../../contexts/user';

import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';

import { CreateTrip, ITripForm } from './api';
import { styles } from './styles';
import CustomButton from '../../components/CustomButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TripForm'>;


export default function TripForm({route}: Props) {
  const { navigate } = useNavigation();
  const { user } = useUser()
  const {trip} = route.params || {};


  const handleSubmit = (async (values: ITripForm) => {
    await CreateTrip(values).then(() => {
      navigate('Home');
    });
  });

  const tripFormik = useFormik<ITripForm>({
    initialValues: {
      name: trip?.name || '',
      description: trip?.description || '',
      dtstart: trip? new Date(trip.dtstart):new Date(),
      dtend: trip? new Date(trip.dtend):new Date(),
      user: user!.id,
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
        <Text>De  </Text>
        <CustomDateTimePicker
          date={tripFormik.values.dtstart}
          setDate={(newDate) => tripFormik.setFieldValue('dtstart', newDate)}
          mode={'date'}
          error={Boolean(tripFormik.errors.dtstart)}
          width='40%'
        />
        <Text>à     </Text>
        <CustomDateTimePicker
          date={tripFormik.values.dtend}
          setDate={(newDate) => tripFormik.setFieldValue('dtend', newDate)}
          mode={'date'}
          error={Boolean(tripFormik.errors.dtend)}
          width='40%'
        />
      </View>
      <CustomButton
        title='Criar viagem'
        onPress={tripFormik.submitForm}
      />
    </View>
  );
}
