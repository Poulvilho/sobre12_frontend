import React from 'react'
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/types';
import { Button, View } from 'react-native';

import { styles } from './styles';

interface IFloatCreateButton {
  form: keyof RootStackParamList;
  title?: string;
}

const FloatCreateButton = ({
  title = '',
  form,
}: IFloatCreateButton) => {
  const { navigate } = useNavigation();
  return (
    <View style={ styles.create }>
      <Button
        title={title}
        onPress={() => navigate(form)}
      />
    </View>
  )
}

export default FloatCreateButton;
