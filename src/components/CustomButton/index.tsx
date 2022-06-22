import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
