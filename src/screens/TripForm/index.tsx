import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUser } from '../../contexts/user';
import { useContract } from '../../contexts/contract';

import { RootStackParamList } from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';

import { CreateTrip, DeleteTrip, EditTrip, ITripForm } from './api';
import { styles } from './styles';

type TripProps = NativeStackScreenProps<RootStackParamList, 'TripForm'>;

export default function TripForm({ route }: TripProps) {
  const { navigate } = useNavigation();
  const { user } = useUser()
  const { contract, setContract } = useContract();
  const trip = route.params?.trip;

  const handleDeleteTrip = useCallback(async () => {
    await DeleteTrip(trip!.id).then(() => {
      navigate('Home');
    });
  }, [trip]);

  const handleSubmit = (async (values: ITripForm) => {
    values.id == ''
      ? await CreateTrip(values).then(() => {
        navigate('Home');
      })
      : await EditTrip(values).then(() => {
        setContract({
          id: values.id,
          name: values.name,
          description: values.description,
          dtstart: values.dtstart,
          dtend: values.dtend,
          user: values.user,
          guest: contract!.guest,
          role: contract!.role,
        });
      });
  });

  const tripFormik = useFormik<ITripForm>({
    initialValues: {
      id: trip?.id || '',
      name: trip?.name || '',
      description: trip?.description || '',
      dtstart: trip? new Date(trip.dtstart):new Date(),
      dtend: trip? new Date(trip.dtend):new Date(),
      user: trip?.user || user!.id,
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
        <Text>à</Text>
        <CustomDateTimePicker
          date={tripFormik.values.dtend}
          setDate={(newDate) => tripFormik.setFieldValue('dtend', newDate)}
          mode={'date'}
          error={Boolean(tripFormik.errors.dtend)}
          width='40%'
        />
      </View>
      <CustomButton
        title={!trip ? 'Criar viagem' : 'Editar viagem'}
        onPress={tripFormik.submitForm}
      />
      {trip && (
        <CustomButton
          title='Deletar viagem'
          onPress={handleDeleteTrip}
          isSecondary
        />
      )}
    </View>
  );
}
