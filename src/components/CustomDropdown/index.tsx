import React, { useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from './styles';

export interface ILOV {
  key: number;
  value: string;
}

export interface ICustomDropdownProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  list: Array<ILOV>;
  title?: string | undefined;
  error?: boolean;
  width?: string;
  [propName: string]: unknown;
}

const CustomDropdown = ({
  selected,
  setSelected,
  list = [],
  title = undefined,
  error = false,
  width = '80%',
}: ICustomDropdownProps) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderItem = (({ item }: ListRenderItemInfo<ILOV>) => (
    <TouchableOpacity
      style={styles.dropdown}
      onPress={() => setSelected(item.key)}
    >
      <Text>
        {item.value}
      </Text>
    </TouchableOpacity>
  ));

  const renderDropdown = () => {
    if (visible) {
      return (
        <Modal visible={visible} transparent animationType="none">
          <TouchableOpacity
            onPress={() => setVisible(false)}
          >
            <View style={styles.dropdown}>
              <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => item.key.toString()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }
  };

  return (
    <View
      style={{ width, borderColor: error ? 'red' : 'black', borderRadius: 1 }}
    >
      {title && <Text style={{alignSelf: 'flex-start'}}>{title}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
      >
        {renderDropdown()}
        {<Text style={{alignSelf: 'flex-start'}}>{selected}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default CustomDropdown;
