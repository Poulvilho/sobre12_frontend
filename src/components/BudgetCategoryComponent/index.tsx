import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FormatUtils from '../../utils/FormatUtils';
import { ILOV } from '../CustomDropdown';
import { styles } from './styles'

interface IBudgetCategoryComponent {
    category: ILOV,
    budgeted: number,
    startDate: Date,
    endDate: Date,
    spent?: number,
  }

const BudgetCategoryComponent = (({
  category,
  budgeted,
  startDate,
  endDate,
  spent = 0,
} : IBudgetCategoryComponent) => {
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
              name={category.icon}
              size={30}
              style={{color: '#f2f2f2',
                margin: 7}}
            />
            <Text style={styles.budgetText}>
              {category.label}
            </Text>
          </View>
          <View style={styles.budget}>
            <Text style={styles.PrimaryText}>Previsto</Text>
            <Text>{FormatUtils.currencyBRL(budgeted)}</Text>
          </View>
          <View style={styles.spent}>
            <Text style={styles.PrimaryText}>Gasto</Text>
            <Text style={
              budgeted > spent
                ? null
                : styles.textDanger 
            }>
              {FormatUtils.currencyBRL(spent)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      { showInfo && 
      <View style={styles.infoContainer}>
        <TouchableOpacity 
          style={styles.info}
          onPress={() => navigate('Budget', {
            category, startDate, endDate,
          })}
        >
          <FontAwesome5 
            name={'list'}
            size={15} 
            style={styles.infoIcon}
          />
          <Text style={styles.text}>Ver orçamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.info}
          onPress={() => navigate('CategoryCosts', {
            category, startDate, endDate,
          })}
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
  
export default BudgetCategoryComponent;
