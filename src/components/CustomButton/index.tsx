import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '../../components/Themed';

import { styles } from './styles';

interface ICustomButtom {
  title: string;
  onPress: () => void;
  style?: {};
  isSecondary?: boolean
}

const CustomButton = (({
  title = '',
  onPress = (() => {}),
  style,
  isSecondary= false,
} : ICustomButtom) => {
  return (
    <TouchableOpacity
      style={[
        isSecondary
          ? styles.SecondaryButton
          : styles.PrimaryButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text 
        style={
          isSecondary
            ? styles.SecondaryText
            : styles.PrimaryText
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
});

export default CustomButton;
