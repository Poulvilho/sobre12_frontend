import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './styles';

interface IGuestItem {
  icon: string
  name: string;
  email: string;
  phone: string;
}

const GuestItem = (({
  icon,
  name,
  email,
  phone,
} : IGuestItem) => {

  const [showInfo, setshowFirst] = useState(false);

  function showInfoFunction(){
    setshowFirst(!showInfo);
  }

  function removeGuest(){
    Alert.alert(
      'Confirmação de remoção',
      'Deseja remover este participante?',
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
        style={styles.container}
        onPress={showInfoFunction}
      >
        <View style={styles.content}>
          <View style={styles.image}>
            <View 
              style={styles.icon}
            >
              <FontAwesome5 
                name={icon}
                size={15} 
                style={styles.iconImage} 
              />
            </View>
          </View>
          <View style={styles.data}>
            <Text
              style={styles.PrimaryText}  
            >
              {name}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.excludeButton}
            onPress={removeGuest}>
            <FontAwesome5 
              name={'trash-alt'}
              size={15} 
              style={styles.excludeIcon} 
            />
          </TouchableOpacity>
        </View>  
      </TouchableOpacity>
      { showInfo && 
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <FontAwesome5 
            name={'envelope'}
            size={15} 
            style={styles.infoIcon}
          />
          <Text>Email: {email}</Text>
        </View>
        <View style={styles.info}>
          <FontAwesome5 
            name={'phone'}
            size={15} 
            style={styles.infoIcon}
          />
          <Text>Telefone: {phone}</Text>
        </View>
      </View>
      }
    </>
  );
});
  
export default GuestItem;
