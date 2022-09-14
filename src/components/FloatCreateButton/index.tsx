import React from 'react'
import { useNavigation } from '@react-navigation/core';

import { styles } from './styles';
import CustomButton from '../CustomButton';

interface IFloatCreateButton {
  form: string;
  title?: string;
}

const FloatCreateButton = ({
  title = '',
  form,
}: IFloatCreateButton) => {
  const { navigate } = useNavigation();
  return (
    <CustomButton
      title={title}
      onPress={() => navigate(form)}
      style={styles.create}
    />
  )
}

export default FloatCreateButton;
