import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useContract } from '../../contexts/contract';

import Categories from '../../constants/Categories';

import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown';
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

  const LoadSubcategories = async () => {
    await GetSubcategory(contract.id).then((response) => {
      setSubcategories(response.data);
    });
  }

  const handleSubmit = (async (values: ISubcategoryForm) => {
    await CreateSubcategory(values);
  });

  const subcategoryFormik = useFormik<ISubcategoryForm>({
    initialValues: {
      description: '',
      category: '0',
      trip: contract.id,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Insira um nome!'),
      category: Yup.number().required().min(1).max(4),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    LoadSubcategories();
  }, [handleSubmit]);

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
        list={Categories}
        width='80%'
      />
      <CustomButton
        title='Salvar'
        onPress={subcategoryFormik.submitForm}
      />
    </View>
  );
}
