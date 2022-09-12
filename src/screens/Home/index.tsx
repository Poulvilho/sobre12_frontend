import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { IContract, useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import CustomButton from '../../components/CustomButton'
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';
import TripSelector from '../../components/TripSelector';

import { GetTrips } from './api';
import { styles } from './styles';

export default function Login() {
  const { navigate } = useNavigation();
  const { user, setUser } = useUser();
  const { setContract } = useContract();

  const [trips, setTrips] = useState<Array<IContract>>(Array(0));

  const handleLogout = (() => {
    setUser(null);
    navigate('Login')
  });

  const handleChooseTrip = ((trip: IContract) => {
    setContract(trip);
    navigate('TripNavigator');
  });

  const LoadTrips = useCallback(async () => {
    await GetTrips(user!.id).then((response) => {
      setTrips(response.data.map((trip) => {
        if (!trip.spectators && !trip.guests) {
          trip.guest = trip.user;
          trip.role = 0;
        } else if (!trip.spectators) {
          trip.guest = trip.guests![0].user;
          trip.role = trip.guests![0].role;
        } else {
          trip.guest = trip.guests![0].user;
          trip.role = 2;
        }
        return trip;
      }));
    }).catch ();
  }, [user]);

  useEffect(() => {
    LoadTrips();
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomButton
          style={styles.user}
          title={user!.name}
          onPress={() => navigate('Profile')}
        />
        <TouchableOpacity 
          style={styles.exit}
          onPress={handleLogout}
        >
          <FontAwesome5 
            name={'sign-out-alt'}
            size={15} 
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 20 }}>Lista de viagens</Text>
      </View>
      <FlatList
        style={styles.trip}
        data={trips}
        renderItem={({item}) => (
          <TripSelector
            key={item.id}
            name={item.name}
            dtstart={item.dtstart}
            dtend={item.dtend}
            onPress={() => handleChooseTrip(item)}
          />
        )}
        keyExtractor={({id}: IContract) => id }
      />
      <FloatCreateButton 
        title='Criar nova viagem' 
        form={'TripForm'} />
    </View>
  );
}
