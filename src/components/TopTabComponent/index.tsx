import React, { useState } from 'react';
import { TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';

import { Text, View } from '../Themed';

import { styles } from './styles';

interface tabItem{
  title: string;
  function: ()=>void,
}


interface ITopTabComponent {
  tabs: tabItem[];
}

export default function TopTabComponent({
  tabs,
}: ITopTabComponent) {

  const [focus, setFocus] = useState(0);

  function focusTab( tabIndex: number){
    setFocus(tabIndex);
    tabs[tabIndex].function();
  }

  const { width } = useWindowDimensions();

  return (
    <View style={styles.header}>
      <FlatList
        style={{
          // width: 100,
        }}
        data={tabs}
        horizontal
        keyExtractor={(item) => item.title }
        renderItem={(item) => (
          <TouchableOpacity 
            onPress={()=>focusTab(item.index)}
            style={[
              styles.tab,
              item.index === focus
                ? styles.selected
                : styles.notSelected,
              {width: width/tabs.length}]}
          >
            <Text 
              style={item.index === focus
                ? styles.selectedText
                : styles.notSelectedText}
            >{item.item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
