import React, { ReactChild } from 'react';

import { Text, View } from '../../components/Themed';

import { styles } from './styles';

interface IBoxContainer {
  title: string;
  children: ReactChild;
}

export default function BoxContainer({
  title= '',
  children = <></>,
}: IBoxContainer) {

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.boxContent}>
        {children}
      </View>
    </View>
  );
}
