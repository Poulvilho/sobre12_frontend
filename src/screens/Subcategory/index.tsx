import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useContract } from '../../contexts/contract';

import CustomButton from '../../components/CustomButton';
import FloatCreateButton from '../../components/FloatCreateButton';
import { View } from '../../components/Themed';

import {
  GetSubcategory,
  ISubcategory,
} from './api';
import { styles } from './styles';
import SubcategoryItem from '../../components/SubcategoryItem';

export default function Subcategory() {
  const { navigate } = useNavigation();
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

  useEffect(() => {
    LoadSubcategories();
  }, [useIsFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={subcategories}
        renderItem={({item}) => (
          <SubcategoryItem
            key={item.id}
            subcategory={item}
            onPress={() => navigate('SubcategoryForm', { subcategory: item })}
          />
        )}
        keyExtractor={({id}: ISubcategory) => id }
      />
      {contract!.role === 0 && (
        <FloatCreateButton
          title='Adicionar Subcategoria'
          form={'SubcategoryForm'}
        />
      )}
    </View>
  );
}
