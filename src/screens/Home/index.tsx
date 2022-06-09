import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native';

import CustomButton from '../../components/CustomButton'
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';
import { IContract, useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import { ITrip } from '../TripForm/api';

import { GetTrips } from './api';
import { styles } from './styles';

export default function Login() {
  const { navigate } = useNavigation();
  const { user } = useUser();
  const { setContract } = useContract();

  const [trips, setTrips] = useState<Array<ITrip>>(Array(0));

  const handleChooseTrip = ((trip: IContract) => {
    setContract(trip);
    navigate('TripNavigator');
  });

  const LoadTrips = useCallback(async () => {
    try {
      const response = await GetTrips(user.id);
      setTrips(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    LoadTrips();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomButton
          title={user.name}
          onPress={() => navigate('Profile')}
        />
        <Button
          title='Sair'
          onPress={() => navigate('Login')}
        />
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 20 }}>Lista de viagens</Text>
        <Button title='Refresh' onPress={() => LoadTrips()} />
      </View>
      {trips.map((trip) => (
        <CustomButton
          key={trip.id}
          title={trip.name}
          onPress={() => handleChooseTrip(trip)}
        />
      ))}
      <FloatCreateButton title='Criar viagem' form='TripForm' />
    </View>
  );
}
