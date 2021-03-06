import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
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

import { CreateBudget, IBudgetForm } from './api';
import { styles } from './styles';

export default function BudgetForm() {
  const { navigate } = useNavigation();
  const { contract } = useContract();
  
  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>();

  const LoadSubcategories = useCallback(async () => {
    await GetSubcategory(contract.id).then((response) => {
      setSubcategories(response.data);
    });
  }, [contract.id]);

  const handleSubmit = (async (values: IBudgetForm) => {
    await CreateBudget(values).then(() => {
      navigate('Budget');
    });
  });

  const budgetFormik = useFormik<IBudgetForm>({
    initialValues: {
      description: '',
      value: 0.0,
      category: '0',
      dtbudget: new Date(),
      trip: contract.id,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Insira um nome!'),
      value: Yup.number().required('Insira um valor!'),
      category: Yup.number().required('Escolha uma categoria').min(1).max(4),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    LoadSubcategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar orçamento</Text>
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
      <CustomDateTimePicker
        date={budgetFormik.values.dtbudget}
        setDate={(newDate) => budgetFormik.setFieldValue('dtbudget', newDate)}
        mode={'date'}
        error={Boolean(budgetFormik.errors.dtbudget)}
        width='80%'
      />
      <CustomButton
        title='Salvar'
        onPress={budgetFormik.submitForm}
      />
    </View>
  );
}
