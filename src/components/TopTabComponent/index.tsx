import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '../Themed';

import { styles } from './styles';

interface ITopTabComponent {
  firstOption: string;
  firstFunction: ()=> void;
  secondOption: string;
  secondFunction: ()=> void;
}

export default function TopTabComponent({
  firstOption,
  firstFunction,
  secondOption,
  secondFunction,
}: ITopTabComponent) {

  const [focusFirst, setfocusFirst] = useState(true);

  function focusFirstFunction(){
    if(!focusFirst){
      setfocusFirst(true);
      firstFunction();
    }
  }

  function focusSecondFunction(){
    if(focusFirst){
      setfocusFirst(false);
      secondFunction();
    }
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={focusFirstFunction}
        style={focusFirst? styles.selected: styles.notSelected}
      >
        <Text 
          style={focusFirst? styles.selectedText: styles.notSelectedText}
        >{firstOption}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={focusSecondFunction}
        style={!focusFirst? styles.selected: styles.notSelected}
      >
        <Text 
          style={!focusFirst? styles.selectedText: styles.notSelectedText}
        >{secondOption}</Text>
      </TouchableOpacity>
    </View>
  );
}
