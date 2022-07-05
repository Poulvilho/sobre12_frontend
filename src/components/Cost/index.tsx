import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormatUtils from '../../utils/FormatUtils';
import { styles } from './styles';

interface ICostShow {
    id: string;
    description: string;
    value: number;
    dtcost: Date;
    trip: string;
    user: string;
    onPress: () => void;
}




const Cost = (({
  id = '',
  description = '',
  value = 0,
  dtcost = new Date(),
  trip = '',
  user = '',
  onPress = (() => {}),
} : ICostShow) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.image}>
          <FontAwesome 
            size={30} 
            name='money'
            color={'black'} />

        </View>
        <View style={styles.data}>
          <Text
            style={styles.PrimaryText}  
          >
            {description}
          </Text>
          <Text> 
            {/* {FormatUtils.dateBR(dtcost)} */}
            {dtcost.toLocaleDateString()}
          </Text>
          <Text style={styles.value}>
            '                                                              '{FormatUtils.currencyBRL(value)}
          </Text>

        </View>

      </View>  
    </TouchableOpacity>
  );
});
  
export default Cost;
