import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { categories } from '../../constants/Categories';

import { useContract } from '../../contexts/contract';

import { RootStackParamList } from '../../navigation/types';
import CustomButton from '../../components/CustomButton';
import CustomDropdown, { CustomItem } from '../../components/CustomDropdown';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';

import {
  CreateSubcategory,
  EditSubcategory,
  DeleteSubcategory,
  ISubcategoryForm,
} from './api';
import { styles } from './styles';

type SubcategoryProps =
    NativeStackScreenProps<RootStackParamList, 'SubcategoryForm'>;

export default function SubcategoryForm({ route }: SubcategoryProps) {
  const { navigate } = useNavigation();
  const { contract } = useContract();
  const subcategory = route.params?.subcategory;

  const handleDeleteSubcategory = useCallback(async () => {
    await DeleteSubcategory(subcategory!.id).then(() => {
      navigate('Home');
    });
  }, [subcategory]);

  const handleSubmit = (async (values: ISubcategoryForm) => {
    !subcategory
      ? await CreateSubcategory(values)
      : await EditSubcategory(subcategory.id, values);
  });

  const subcategoryFormik = useFormik<ISubcategoryForm>({
    initialValues: {
      description: subcategory?.description || '',
      category: subcategory?.category || '6',
      trip: subcategory?.trip || contract!.id,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Insira um nome!'),
      category: Yup.number().required(),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
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
          <CustomItem
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </CustomDropdown>
      <CustomButton
        title='Salvar'
        onPress={subcategoryFormik.submitForm}
      />
      {subcategory && (
        <CustomButton
          title='Deletar viagem'
          onPress={handleDeleteSubcategory} />
      )}
    </View>
  );
}