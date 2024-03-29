import React, { useCallback, useEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useContract } from '../../contexts/contract';

import { categories } from '../../constants/Categories';

import CustomButton from '../../components/CustomButton';
import CustomDateTimePicker from '../../components/CustomDatePicker';
import CustomDropdown, { CustomItem } from '../../components/CustomDropdown';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';

import { GetSubcategory, ISubcategory } from '../Subcategory/api';

import { CreateBudget, DeleteBudget, IBudgetForm, UpdateBudget } from './api';
import { styles } from './styles';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'BudgetForm'>;

export default function BudgetForm({ route, navigation }: Props) {
  const { contract } = useContract();
  const budget = route.params?.budget;
  
  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>();

  const LoadSubcategories = useCallback(async () => {
    await GetSubcategory(contract!.id).then((response) => {
      setSubcategories(response.data);
    });
  }, [contract!.id]);

  const handleDeleteBudget = (async () => {
    await DeleteBudget(budget!.id).then(() => {
      navigation.goBack();
    })
  })

  const handleSubmit = (async (values: IBudgetForm) => {
    if(!budget)
      await CreateBudget(values).then(() => {
        navigation.goBack();
      });
    else
      await UpdateBudget(budget.id, values).then(() => {
        navigation.goBack();
      });
  });

  const budgetFormik = useFormik<IBudgetForm>({
    initialValues: {
      description: budget?.description || '',
      value: budget?.value.toString() || '',
      category: budget?.category || '6',
      dtbudget: budget? new Date(budget.dtbudget) : new Date(),
      trip: contract!.id,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Insira um nome!'),
      value: Yup.number().required('Insira um valor!'),
      category: Yup.number().required('Escolha uma categoria'),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    LoadSubcategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {budget? 'Editar orçamento':'Adicionar orçamento'}
      </Text>
      <CustomTextInput
        title='Descrição'
        fieldName='description'
        formikHelpers={budgetFormik}
        width='80%'
        mode='outlined'
      />
      <CustomTextInput
        title='Valor'
        fieldName='value'
        formikHelpers={budgetFormik}
        width='80%'
        mode='outlined'
        keyboardType='numeric'
      />
      <CustomDropdown
        title='Categoria'
        formikHelpers={budgetFormik}
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
      <View style={{ zIndex: 100 }}>
        <CustomDateTimePicker
          date={budgetFormik.values.dtbudget}
          setDate={(newDate) => budgetFormik.setFieldValue('dtbudget', newDate)}
          mode={'date'}
          error={Boolean(budgetFormik.errors.dtbudget)}
          width='80%'
        />
      </View>
      {contract!.role === 0 && 
        <>
          <CustomButton
            title={budget? 'Salvar alterações' : 'Criar orçamento'}
            onPress={budgetFormik.submitForm}
          />
          {budget && 
            <CustomButton
              title={'Deletar orçamento'}
              onPress={handleDeleteBudget}
              isSecondary
            />
          }
        </>
      }
    </View>
  );
}
