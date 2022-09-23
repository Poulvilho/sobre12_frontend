import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import FormatUtils from '../../utils/FormatUtils';

import { IDebt } from '../../screens/Debt/api';

import { styles } from './styles';
import { EditDebt } from './api';

interface IDebtShow {
    debt: IDebt,
    mine: boolean
}

const DebtItem = (({
  debt,
  mine,
} : IDebtShow) => {
  const [showInfo, setshowInfo] = useState(false);
  const [settled, setSettled] = useState(debt.settled);
  function showInfoFunction(){
    setshowInfo(!showInfo);
  }

  const handleConfirmPayment = (async () => {
    await EditDebt(debt).then(() => {setSettled(true)});
  });

  function ConfirmPayment() {
    Alert.alert(
      'Confirmação de recebimento',
      'Confirma que o valor devido foi pago?',
      [{
        text: 'Cancelar',
        onPress: () => { },
        style: 'cancel',
      }, {
        text: 'Confirmar',
        onPress: handleConfirmPayment,
      }],
    );
  }

  return (
    <>
      <TouchableOpacity
        style={settled? styles.containerSettled: styles.container}
        onPress={showInfoFunction}
      >
        <View style={styles.content}>
          <View style={styles.image}>
            <View style={{ marginRight:'auto', marginLeft:'auto' }}>
              <FontAwesome5 
              // Por que a categoria do custo começa em zero 
              // e da viagem em 1?
                name={mine ? 'arrow-right' : 'arrow-left'}
                size={15} 
                style={{ color: 'black' }} 
              />
            </View>
          </View>
          <View style={styles.data}>
            <View style={styles.info}>
              <Text style={styles.PrimaryText}>
                {mine ? debt.Cost.User.name : debt.User?.name}
              </Text>
            </View>
            <View style={styles.info}>
              <Text>{FormatUtils.dateBR(debt.Cost.dtcost.toString())}</Text>
              <Text>{FormatUtils.currencyBRL(debt.value)}</Text>
            </View>
          </View>
        </View>  
      </TouchableOpacity>
      { showInfo && !settled && !mine && (
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.info} onPress={ConfirmPayment}>
            <FontAwesome5 
              name={'check-circle'}
              size={15} 
              style={styles.infoIcon}
            />
            <Text style={styles.text}>Confirmar recebimento de crédito</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
});

export default DebtItem;
