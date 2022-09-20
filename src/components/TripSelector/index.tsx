import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { GetUser } from '../../screens/Login/api';
import FormatUtils from '../../utils/FormatUtils';
import { styles } from './styles';

interface ITripSelector {
  name: string;
  dtstart: Date;
  dtend: Date;
  onPress: () => void;
  guest?: string;
}

const TripSelector = (({
  name = '',
  dtstart = new Date(),
  dtend = new Date(),
  onPress = (() => {}),
  guest = undefined,
} : ITripSelector) => {
  const [guestName, setGuestName] = useState<String>('')
  const LoadGuestName = (async () => {
    await GetUser(guest!).then((response) => {
      setGuestName(response.data.name);
    });
  });

  useEffect(() => {
    if (guest)
      LoadGuestName();
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.image}>
          <FontAwesome5 
            name="plane" 
            size={32} 
            color={Colors.light.secondaryButton} 
          />
        </View>
        <View style={styles.data}>
          <Text
            style={styles.PrimaryText}  
          >
            {/* Adicionar ... em nomes grandes */}
            {
              name
            }
          </Text>
          {/* <Text>
            {
              (description.length>61)
              ? description.substring(0,58) + '...'
              : description
            }
          </Text> */}
          <Text
            style={styles.date}> 
            {FormatUtils.dateBR(dtstart.toString())
            +' a '
            + FormatUtils.dateBR(dtend.toString())}
          </Text>
          {guestName !== '' && (
            <Text>Participante: {guestName}</Text>
          )}
        </View>
      </View>  
    </TouchableOpacity>
  );
});
  
export default TripSelector;
