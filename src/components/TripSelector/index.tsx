import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FormatUtils from '../../utils/FormatUtils';
import { styles } from './styles';

interface ITripSelector {
    name: string;
    dtstart: Date;
    dtend: Date;
    onPress: () => void;
}

const TripSelector = (({
  name = '',
  dtstart = new Date(),
  dtend = new Date(),
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
            {/* Adicionar ... em nomes grandes */}
            {
              name
            }
          </Text>
          {/* <Text>
            {
              (description.length>61)
              ? description.substring(0,58) + '...'
              : description
            }
          </Text> */}
          <Text
            style={styles.date}> 
            {FormatUtils.dateBR(dtstart.toString())
            +' a '
            + FormatUtils.dateBR(dtend.toString())}
          </Text>
        </View>
      </View>  
    </TouchableOpacity>
  );
});
  
export default TripSelector;
