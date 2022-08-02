import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useContract } from '../../contexts/contract';

import { categories } from '../../constants/Categories';

import CustomButton from '../../components/CustomButton';
import CustomDropdown, { CustomItem } from '../../components/CustomDropdown';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';

import {
  CreateSubcategory,
  GetSubcategory,
  ISubcategory,
  ISubcategoryForm,
} from './api';
import { styles } from './styles';

export default function Subcategory() {
  const { contract } = useContract();
  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>();

  const LoadSubcategories = useCallback(async () => {
    await GetSubcategory(contract!.id).then((response) => {
      setSubcategories(response.data);
    });
  }, [contract]);

  const handleSubmit = (async (values: ISubcategoryForm) => {
    await CreateSubcategory(values);
  });

  const subcategoryFormik = useFormik<ISubcategoryForm>({
    initialValues: {
      description: '',
      category: '0',
      trip: contract!.id,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Insira um nome!'),
      category: Yup.number().required().min(1).max(4),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    LoadSubcategories();
  }, [LoadSubcategories]);

  return (
    <View style={styles.container}>
      <FlatList
        data={subcategories}
        renderItem={({item}) => (
          <CustomButton
            key={item.id}
            title={item.description}
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: ISubcategory) => id }
      />
      <Text style={styles.title}>Adicionar subcategoria</Text>
      <CustomTextInput
        title='Descrição'
        fieldName='description'
        formikHelpers={subcategoryFormik}
        width='80%'
        mode='outlined'
      />
      <CustomDropdown
        title='Categoria'
        formikHelpers={subcategoryFormik}
        fieldName='category'
        width='80%'
      >
        {categories.map((item) => (
          <CustomItem key={item.value} label={item.label} value={item.value} />
        ))}
      </CustomDropdown>
      <CustomButton
        title='Salvar'
        onPress={subcategoryFormik.submitForm}
      />
    </View>
  );
}
