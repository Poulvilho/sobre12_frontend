import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { IBudget } from '../../screens/BudgetForm/api';
import FormatUtils from '../../utils/FormatUtils';
import { styles } from './styles'

interface IBudgetComponent {
    budget: IBudget
    onPress: () => void;
}

const BudgetComponent = (({
  budget,
  onPress = (() => {}),
} : IBudgetComponent) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.category}>
          {/* Icone da categoria */}
          <FontAwesome5
            name={FormatUtils.getIcon(budget.category)}
            size={30}
            style={{
              color: 'black',
              margin: 7,
            }} />
          <Text>
            {budget.description}
          </Text>
        </View>
        <View style={styles.budget}>
          <Text
            style={styles.PrimaryText}
          >Orçamento
          </Text>
          <Text>{FormatUtils.currencyBRL(budget.value)}</Text>
        </View>
        <View style={styles.spent}>
          <Text
            style={styles.PrimaryText}
          >Gasto
          </Text>
          <Text>{FormatUtils.currencyBRL(200)}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )});
  
export default BudgetComponent;
