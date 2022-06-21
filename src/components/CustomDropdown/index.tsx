import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface IListItem {
  key: string;
  value: string;
}

export interface ICustomDropdownProps {
  selected: Date;
  setSelected: React.Dispatch<React.SetStateAction<Date>>;
  list: Array<IListItem>;
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

  const renderItem = (({ item }) => (
    <Text style={styles.dropdown}>
      {item.value}
    </Text>
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
                keyExtractor={(item) => item.key}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }
  };

  return (
    <View style={{width}}>
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
