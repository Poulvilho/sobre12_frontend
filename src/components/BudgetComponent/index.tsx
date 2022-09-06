import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { IBudget } from '../../screens/BudgetForm/api';
import FormatUtils from '../../utils/FormatUtils';
import { styles } from './styles'

interface IBudgetComponent {
    budget: IBudget,
    spent?: number,
    onPress: () => void;
}

const BudgetComponent = (({
  budget,
  spent,
} : IBudgetComponent) => {
  const [showInfo, setshowInfo] = useState(false);
  const { navigate } = useNavigation();

  function showInfoFunction(){
    setshowInfo(!showInfo);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={showInfoFunction}
      >
        <View style={styles.content}>
          <View style={styles.category}>
            {/* Icone da categoria */}
            <FontAwesome5
              name={FormatUtils.getIcon(budget.category)}
              size={30}
              style={{color: '#f2f2f2', margin: 7}}
            />
            <Text style={styles.budgetText}>
              {budget.description}
            </Text>
          </View>
          <View 
            style={
              [
                styles.budget,
                !spent
                  ?styles.budgetSolo
                  :null,
              ]
            }
          >
            <Text
              style={styles.PrimaryText}
            >
              Orçamento
            </Text>
            <Text>{FormatUtils.currencyBRL(budget.value)}</Text>
          </View>
          {spent && 
            <View style={styles.spent}>
              <Text
                style={styles.PrimaryText}
              >
                Gasto
              </Text>
              <Text>{FormatUtils.currencyBRL(spent)}</Text>
            </View>
          }

        </View>
      </TouchableOpacity>
      { showInfo && 
      <View style={styles.infoContainer}>
        <TouchableOpacity 
          style={styles.info}
          onPress={()=>{
            navigate('BudgetForm',{budget: budget})}}
        >
          <FontAwesome5 
            name={'edit'}
            size={15} 
            style={styles.infoIcon}
          />
          <Text style={styles.text}>Editar orçamento</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.info}
          onPress={()=>{
            navigate('BudgetCosts',{budget: budget})}}
        >
          <FontAwesome5 
            name={'money-bill-wave'}
            size={15} 
            style={styles.infoIcon}
          />
          <Text style={styles.text}>Visualizar custos</Text>
        </TouchableOpacity>
      </View>
      }
    </>
  )});
  
export default BudgetComponent;
