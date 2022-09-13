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

export default function Subcategory() {
  const { navigate } = useNavigation();
  const { contract } = useContract();

  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>();

  const LoadSubcategories = useCallback(async () => {
    await GetSubcategory(contract!.id).then((response) => {
      setSubcategories(response.data);
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
          <CustomButton
            key={item.id}
            title={item.description}
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
