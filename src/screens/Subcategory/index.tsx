import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

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
import SubcategoryItem from '../../components/SubcategoryItem';

export default function Subcategory() {
  const { user } = useUser();
  const { contract } = useContract();

  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>();

  const LoadSubcategories = useCallback(async () => {
    await GetSubcategory(contract!.id).then((response) => {
      let subcategorySorted = response.data.sort((a,b)=>{
        let categorySort = parseInt(a.category) - parseInt(b.category)
        if(categorySort != 0)
          return categorySort;
        else{
          if(a.description < b.description)
            return -1
          else
            return 1
        }
      })
      setSubcategories(subcategorySorted);
    });
  }, [contract]);

  const handleSubmit = (async (values: ISubcategoryForm) => {
    await CreateSubcategory(values);
  });

  const subcategoryFormik = useFormik<ISubcategoryForm>({
    initialValues: {
      description: '',
      category: '6',
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
          <SubcategoryItem
            key={item.id}
            subcategory={item}
            onPress={() => {}}
          />
        )}
        keyExtractor={({id}: ISubcategory) => id }
      />
      {user!.id === contract!.user && (
        <>
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
        </>
      )}
    </View>
  );
}
