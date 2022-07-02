import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormatUtils from '../../utils/FormatUtils';
import { styles } from './styles';

interface ITripSelector {
    name: string;
    description: string;
    dtstart: Date;
    dtend: Date;
    onPress: () => void;
}

const TripSelector = (({
  name = '',
  dtstart = new Date(),
  dtend = new Date(),
  description = '',
  onPress = (() => {}),
} : ITripSelector) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.image}>

        </View>
        <View style={styles.data}>
          <Text
            style={styles.PrimaryText}  
          >
            {name}
          </Text>
          <Text>
            {description}
          </Text>
          <Text> 
            {FormatUtils.dateBR(dtstart)
            +' a '
            + FormatUtils.dateBR(dtend)}</Text>

        </View>

      </View>  
    </TouchableOpacity>
  );
});
  
export default TripSelector;
