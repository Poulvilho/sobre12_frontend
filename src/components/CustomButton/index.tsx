import React from 'react';
import { Button } from 'react-native';

interface ICustomButtom {
  title: string;
  onPress: () => void
}

const CustomButton = (({
  title = '',
  onPress = (() => {}),
} : ICustomButtom) => {
  return (
    <Button
      title={title}
      onPress={onPress}
    />
  );
});

export default CustomButton;
