import React, { Children, ReactChild } from 'react';

import { Text, View } from '../../components/Themed';

import { styles } from './styles';

interface IBoxContainer {
  title: string;
  children: ReactChild;
}

export default function BoxContainer(props: IBoxContainer) {

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.boxContent}>
        {props.children}
      </View>
    </View>
  );
}
