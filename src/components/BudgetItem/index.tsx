import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import FormatUtils from '../../utils/FormatUtils';

import { styles } from './styles';
import { IBudget } from '../../screens/BudgetForm/api';


interface IBudgetComponent {
  budget: IBudget,
}

const BudgetItem = (({
  budget,
} : IBudgetComponent) => {

  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={()=>{
        navigate('BudgetForm',{budget: budget})}}
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
              name={FormatUtils.getIcon(budget.category)}
              size={15} 
              style={styles.icon} 
            />
          </View>
        </View>
        <View style={styles.data}>
          <Text
            style={styles.PrimaryText}  
          >
            {budget.description}
          </Text>
          <View 
            style={styles.info}>
            <Text> 
              {
                FormatUtils.dateBR(budget.dtbudget.toString())
              }</Text>
            <Text> 
              {
                FormatUtils.currencyBRL(budget.value)
              }</Text>
          </View>
        </View>

      </View>  
    </TouchableOpacity>
  );
});
  
export default BudgetItem;
