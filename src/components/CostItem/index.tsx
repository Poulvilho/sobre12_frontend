import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import FormatUtils from '../../utils/FormatUtils';

import { ICost } from '../../screens/CostForm/api';

import { styles } from './styles';

interface ICostShow {
    cost: ICost;
}

const CostItem = (({
  cost,
}: ICostShow) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('CostForm', { cost })}
    >
      <View style={styles.content}>
        <View style={styles.image}>
          <View 
            style={
              {
                marginRight:'auto',
                marginLeft:'auto',
              }
            }>
            <FontAwesome5 
              // Por que a categoria do custo começa em zero 
              // e da viagem em 1?
              name={FormatUtils.getIcon(cost.category)}
              size={15} 
              style={styles.icon} 
            />
          </View>
        </View>
        <View style={styles.data}>
          <Text
            style={styles.PrimaryText}  
          >
            {cost.description}
          </Text>
          <View 
            style={styles.info}>
            <Text> 
              {
                FormatUtils.dateBR(cost.dtcost.toString())
              }</Text>
            <Text> 
              {
                FormatUtils.currencyBRL(cost.value)
              }</Text>
          </View>
        </View>

      </View>  
    </TouchableOpacity>
  );
});
  
export default CostItem;
