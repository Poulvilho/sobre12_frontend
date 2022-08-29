import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './styles';

interface ITripConfigItem {
  icon: string
  title: string;
  onPress:() => void;
}

const TripConfigItem = (({
  icon,
  title,
  onPress,
} : ITripConfigItem) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.image}>
          <View 
            style={styles.icon}
          >
            <FontAwesome5 
              // Por que a categoria do custo começa em zero 
              // e da viagem em 1?
              name={icon}
              size={15} 
              style={styles.iconImage} 
            />
          </View>
        </View>
        <View style={styles.data}>
          <Text
            style={styles.PrimaryText}  
          >
            {title}
          </Text>
        </View>
      </View>  
    </TouchableOpacity>
  );
});
  
export default TripConfigItem;
