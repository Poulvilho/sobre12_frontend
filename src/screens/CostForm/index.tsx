import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';

import { categories } from '../../constants/Categories';

import { useUser } from '../../contexts/user';
import { useContract } from '../../contexts/contract';

import { Text, View } from '../../components/Themed';
import CustomButton from '../../components/CustomButton';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomDropdown, { CustomItem } from '../../components/CustomDropdown';
import CustomTextInput from '../../components/CustomTextInput';

import AddParticipant from '../AddParticipantButton';

import { IGuestUser } from '../Guest/api';
import { CreateCost, ICostForm } from './api';
import { styles } from './styles';
import { GetSubcategory, ISubcategory } from '../Subcategory/api';

export default function CostForm() {
  const { navigate } = useNavigation();
  const { contract } = useContract();
  const { user } = useUser();

  const [participants, setParticipants] = useState<Array<IGuestUser>>([])
  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>();

  const LoadSubcategories = useCallback(async () => {
    await GetSubcategory(contract!.id).then((response) => {
      setSubcategories(response.data);
    });
  }, [contract!.id]);

  const handleSubmit = useCallback(async (values: ICostForm) => {
    values.participants = participants.map(participant => participant.id);

    await CreateCost(values).then(() => {
      navigate('TripNavigator');
    });
  }, [participants]);

  const costFormik = useFormik<ICostForm>({
    initialValues: {
      description: '',
      value: '',
      category: '6',
      dtcost: new Date(),
      participants: [],
      trip: contract!.id,
      user: user!.id,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Insira um nome!'),
      value: Yup.number().required('Insira um valor!'),
      category: Yup.string().required('Insira um nome!'),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    LoadSubcategories();
  }, []);

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
      <CustomDropdown
        title='Categoria'
        formikHelpers={costFormik}
        fieldName='category'
        width='80%'
      >
        {categories.map((item) => (
          <CustomItem key={item.value} label={item.label} value={item.value} />
        ))}
        {subcategories?.map((item) => (
          <CustomItem key={item.id} label={item.description} value={item.id} />
        ))}
      </CustomDropdown>
      <CustomDateTimePicker
        date={costFormik.values.dtcost}
        setDate={(newDate) => costFormik.setFieldValue('dtcost', newDate)}
        mode={'date'}
        error={Boolean(costFormik.errors.dtcost)}
        width='80%'
      />
      {participants.length > 0 && (
        participants.map((participant) => (
          <Text key={participant.id}>{participant.name}</Text>
        ))
      )}
      <AddParticipant
        participants={participants}
        setParticipants={setParticipants}
      />
      <CustomButton
        title='Salvar'
        onPress={costFormik.submitForm}
      />
    </View>
  );
}
