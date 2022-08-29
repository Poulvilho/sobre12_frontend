import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

import FormatUtils from '../../utils/FormatUtils';

import { styles } from './styles';
import { IDebt } from '../../screens/Debt/api';

interface IDebtShow {
    debt: IDebt,
    mine: boolean
    onPress: () => void;
}

const DebtItem = (({
  debt,
  mine,
  // onPress = (() => {}),
} : IDebtShow) => {
  const [showInfo, setshowInfo] = useState(false);
  function showInfoFunction(){
    setshowInfo(!showInfo);
  }

  function ConfirmPayment(){
    Alert.alert(
      'Confirmação de recebimento',
      'Confirma que o valor devido foi pago?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Confirmar', onPress: () => console.log('OK Pressed') },
      ],
    );
  }

  return (
    <>
      <TouchableOpacity
        style={debt.settled? styles.containerSettled: styles.container}
        onPress={showInfoFunction}
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
                name={mine? 'arrow-right':'arrow-left'}
                size={15} 
                style={{ 
                  color: 'black',
                }
                } 
              />
            </View>
          </View>
          <View style={styles.data}>
            <View style={styles.info}>
              <Text
                style={styles.PrimaryText}  
              >
                {debt.User.name}
              </Text>
              <Text>{debt.settled? 'Pago': 'Pendente'}</Text>
            </View>
            <View 
              style={styles.info}>
              <Text> 
                {
                  FormatUtils.dateBR(debt.Cost.dtcost.toString())
                }</Text>
              <Text> 
                {
                  FormatUtils.currencyBRL(debt.value)
                }</Text>
            </View>
          </View>

        </View>  
      </TouchableOpacity>
      { showInfo && !debt.settled && !mine &&
      <View style={styles.infoContainer}>
        <TouchableOpacity 
          style={styles.info}
          onPress={ConfirmPayment}
        >
          <FontAwesome5 
            name={'check-circle'}
            size={15} 
            style={styles.infoIcon}
          />
          <Text style={styles.text}>Confirmar recebimento de crédito</Text>
        </TouchableOpacity>
      </View>
      }
    </>
  );
});
  
export default DebtItem;
