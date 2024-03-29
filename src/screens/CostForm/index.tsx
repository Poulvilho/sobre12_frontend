import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

import { categories } from '../../constants/Categories';

import { useContract } from '../../contexts/contract';

import { Text, View } from '../../components/Themed';
import CustomButton from '../../components/CustomButton';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomDropdown, { CustomItem } from '../../components/CustomDropdown';
import CustomTextInput from '../../components/CustomTextInput';

import AddParticipant from '../AddParticipantButton';

import { IGuestUser } from '../Guest/api';
import { GetSubcategory, ISubcategory } from '../Subcategory/api';

import { CreateCost, DeleteCost, ICostForm, UpdateCost } from './api';
import { styles } from './styles';

type CostProps = NativeStackScreenProps<RootStackParamList, 'CostForm'>;

export default function CostForm({ route, navigation }: CostProps) {
  const { contract } = useContract();
  const cost = route.params?.cost;

  const [participants, setParticipants] = useState<Array<IGuestUser>>([]);
  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>();

  const LoadSubcategories = useCallback(async () => {
    await GetSubcategory(contract!.id).then((response) => {
      setSubcategories(response.data);
    });
  }, [contract!.id]);

  const handleDeleteCost = (async () => {
    await DeleteCost(cost!.id).then(() => {
      navigation.goBack();
    })
  })

  const handleSubmit = useCallback(async (values: ICostForm) => {
    values.participants = participants.map(participant => participant.id);
    if(!cost)
      await CreateCost(values).then(() => {
        navigation.goBack();
      });
    else
      await UpdateCost(cost.id, values).then(() => {
        navigation.goBack();
      });
  }, [participants]);

  const costFormik = useFormik<ICostForm>({
    initialValues: {
      description: cost?.description || '',
      value: cost?.value.toString() || '',
      category: cost?.category.toString() || '6',
      dtcost: cost? new Date(cost.dtcost) : new Date(),
      participants: cost?.participants || [],
      trip: cost?.trip || contract!.id,
      user: cost?.user || contract!.guest,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Insira um nome!'),
      value: Yup.number().required('Insira um valor!'),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    LoadSubcategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {cost ? 'Alterar custo' : 'Adicionar custo'}
      </Text>
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
      <View style={{ zIndex: 100}}>
        <CustomDateTimePicker
          date={costFormik.values.dtcost}
          setDate={(newDate) => costFormik.setFieldValue('dtcost', newDate)}
          mode={'date'}
          error={Boolean(costFormik.errors.dtcost)}
          width='80%'
        />
      </View>
      {participants.length > 0 && (
        participants.map((participant) => (
          <Text key={participant.id}>{participant.name}</Text>
        ))
      )}
      {contract!.role < 2 && 
        <>
          <AddParticipant
            participants={participants}
            setParticipants={setParticipants}
          />
          <CustomButton
            title={cost ? 'Salvar alterações' : 'Criar custo'}
            onPress={costFormik.submitForm}
          />
          {cost && 
            <CustomButton
              title={'Deletar custo'}
              onPress={handleDeleteCost}
              isSecondary
            />
          }
        </>
      }
    </View>
  );
}
