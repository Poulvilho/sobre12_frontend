import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './styles';
import { IGuestUser } from '../../screens/Guest/api';

interface IGuestInCostItem {
  isParticipant: boolean
  guest: IGuestUser
  onPress:() => void;
}

const GuestInCostItem = (({
  isParticipant,
  guest,
  onPress,
} : IGuestInCostItem) => {

  const [participant, setParticipant] = useState<boolean>(isParticipant);

  const handleClick = ()=>{
    setParticipant(!participant)
    onPress()
  }
  let icon = participant ?'check-circle' : 'user'
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleClick}
    >
      <View style={styles.content}>
        <View style={[styles.image,participant?styles.selected:null]}>
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
            {guest.name}
          </Text>
        </View>
      </View>  
    </TouchableOpacity>
  );
});
  
export default GuestInCostItem;
