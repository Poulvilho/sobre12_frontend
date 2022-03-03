import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native';

import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { authResult } from '../../hooks/auth';

import { ITrip } from '../TripForm/api';

import { GetTrips } from './api';
import { styles } from './styles';

export default function Login() {
  const { navigate } = useNavigation();

  const [trips, setTrips] = useState<Array<ITrip>>(Array(0));

  const LoadTrips = useCallback(async () => {
    try {
      const response = await GetTrips();
      setTrips(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    LoadTrips();
  }, [authResult]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Button
          title={authResult.name}
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
        <Button
          key={trip.id}
          title={trip.name}
          onPress={() => navigate('TripNavigator')}
        />
      ))}
      <FloatCreateButton title='Criar viagem' form='TripForm' />
    </View>
  );
}
